/* See license.txt for terms of usage */

/**
 * @module core/RequestListService
 */
define("core/RequestListService", [
    "core/lib",
    "preview/harModel"
],

function(Lib, HarModel) {

// ********************************************************************************************* //

/**
 * @object This object represents a phase that joins related requests into groups (phases).
 */
function Phase(file)
{
    this.files = [];
    this.pageTimings = [];

    this.addFile(file);
};

Phase.prototype =
{
    addFile: function(file)
    {
        this.files.push(file);
        file.phase = this;
    },

    getLastStartTime: function()
    {
        // The last request start time.
        return this.files[this.files.length - 1].startedDateTime;
    }
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

var RequestListService = {
    isCachedEntry: function(entry) {
        var response = entry.response;
        var resBodySize = response.bodySize > 0 ? response.bodySize : 0;
        return (response.status == 304 || (resBodySize === 0 && response.content && response.content.size > 0));
    },

    cachedEntrySize: function(entry) {
        var response = entry.response;
        var resBodySize = response.bodySize > 0 ? response.bodySize : 0;
        return resBodySize || (response.content && response.content.size) || 0;
    },

    summarizePhase: function(phase) {
        var cachedSize = 0, totalSize = 0;

        var category = "all";
        if (category == "all") {
            category = null;
        }

        var fileCount = 0;
        var minTime = 0, maxTime = 0;

        for (var i=0; i<phase.files.length; i++)
        {
            var file = phase.files[i];
            var startedDateTime = Lib.parseISO8601(file.startedDateTime);

            if (!category || file.category == category)
            {
                ++fileCount;

                var bodySize = file.response.bodySize;
                var size = (bodySize && bodySize != -1) ? bodySize : file.response.content.size;

                totalSize += size;
                if (RequestListService.isCachedEntry(file)) {
                    cachedSize += size;
                }

                if (!minTime || startedDateTime < minTime) {
                    minTime = startedDateTime;
                }

                var fileEndTime = startedDateTime + file.time;
                if (fileEndTime > maxTime) {
                    maxTime = fileEndTime;
                }
            }
        }

        var totalTime = maxTime - minTime;
        return {
            cachedSize: cachedSize,
            totalSize: totalSize,
            totalTime: totalTime,
            fileCount: fileCount
        };
    },

    calcPhases: function(input, page, shouldBreakLayout, phaseInterval) {
        function startPhase(file)
        {
            var phase = new Phase(file);
            phases.push(phase);
            return phase;
        }

        var requests = HarModel.getPageEntries(input, page);

        var phases = [];

        if (!phaseInterval)
            phaseInterval = 4000;

        var phase = null;

        var pageStartedDateTime = page ? Lib.parseISO8601(page.startedDateTime) : null;

        // The onLoad time stamp is used for proper initialization of the first phase. The first
        // phase contains all requests till onLoad is fired (even if there are time gaps).
        // Don't worry if it
        var onLoadTime = (page && page.pageTimings) ? page.pageTimings["onLoad"] : -1;

        // The timing could be NaN or -1. In such case keep the value otherwise
        // make the time absolute.
        if (onLoadTime > 0) {
            onLoadTime += pageStartedDateTime;
        }

        // Iterate over all requests and create phases.
        for (var i=0; i<requests.length; i++)
        {
            var file = requests[i];

            // If the parent page doesn't exists get startedDateTime of the
            // first request.
            if (!pageStartedDateTime)
                pageStartedDateTime = Lib.parseISO8601(file.startedDateTime);

            var startedDateTime = Lib.parseISO8601(file.startedDateTime);
            var phaseLastStartTime = phase ? Lib.parseISO8601(phase.getLastStartTime()) : 0;
            var phaseEndTime = phase ? phase.endTime : 0;

            // New phase is started if:
            // 1) There is no phase yet.
            // 2) There is a gap between this request and the last one.
            // 3) The new request is not started during the page load.
            var newPhase = false;
            if (phaseInterval >= 0)
            {
                newPhase = (startedDateTime > onLoadTime) &&
                    ((startedDateTime - phaseLastStartTime) >= phaseInterval) &&
                    (startedDateTime + file.time >= phaseEndTime + phaseInterval);
            }

            // 4) The file can be also marked with breakLayout
            var breakLayout = (shouldBreakLayout && shouldBreakLayout(i)) || false;
            if (breakLayout)
            {
                if (!phase || breakLayout)
                    phase = startPhase(file);
                else
                    phase.addFile(file);
            }
            else
            {
                if (!phase || newPhase)
                    phase = startPhase(file);
                else
                    phase.addFile(file);
            }

            if (phase.startTime == undefined || phase.startTime > startedDateTime)
                phase.startTime = startedDateTime;

            // file.time represents total elapsed time of the request.
            if (phase.endTime == undefined || phase.endTime < startedDateTime + file.time)
                phase.endTime = startedDateTime + file.time;
        }

        return phases;
    }
};

//*************************************************************************************************

RequestListService.Phase = Phase;

return RequestListService;

//*************************************************************************************************
});
