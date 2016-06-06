/* See license.txt for terms of usage */

/**
 * @module core/RequestListService
 */
define("core/RequestListService", [
    "core/lib"
],

function(Lib) {

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
    }
};

//*************************************************************************************************

return RequestListService;

//*************************************************************************************************
});
