/*

  github-info.js - v1
  JavaScript library for counting stats on a repo or user/org
  githubInfo("stretchr/arg.js")

  Originally written by Ryan Quinn
  Modified by Asim Jamshed
  Copyright (c) 2013 Stretchr, Inc.

  Please consider promoting this project if you find it useful.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
  to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
  FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.

  Update notes: The original version only fetched stargazer count. The updated version
  has been patched so that it fetches network (fork) count and watcher count as well.

  #BUG#: Watcher count is currently giving incorrect value.
*/

(function(exports) {
	exports.githubInfo = function (repo, callback) {
		var xmlhttp = new XMLHttpRequest(),
			url = ["https://api.github.com"],
			useCallback = (typeof(callback) == "function");

		//count the stats
		function countStat(response) {
			//don't care, just make it an array
			if (!(response instanceof Array)) {
				response = [response];
			}
			//start the count
			var stats1 = 0;
			var stats2 = 0;
			var stats3 = 0;

			//var propValue1;
			//for(var i in response) {
			//	propValue1 = response[i]
			//	var propValue2;
			//	for (var j in response[i]) {
			//		propValue2 = response[i][j];
			//		alert(j, propValue2);
			//	}
			//	alert(i,propValue1);
			//}

			for (var i in response) {
				stats1 += parseInt(response[i].stargazers_count);
			    	stats2 += parseInt(response[i].network_count);
				stats3 += parseInt(response[i].subscribers_count);
			}

			//return stats;
			callback(stats1, stats2, stats3);
		}

		//determine if we're looking at a collection or a single repo
		repo = repo.split("/");

		if (repo.length === 1) {
			url.push("users", repo[0], "repos");
		} else {
			url.push("repos", repo[0], repo[1]);
		}

		//check if we were given a callback, if so we set that up
		if (useCallback) {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					countStat(JSON.parse(xmlhttp.responseText));
				}
			}
		}

		xmlhttp.open("GET", url.join("/"), useCallback);
		//set the github media header
		xmlhttp.setRequestHeader("Accept", "application/vnd.github.v3+json");
		xmlhttp.send();

		if (!useCallback) {
			//no callback, just wait for the response
			return countStat(JSON.parse(xmlhttp.responseText));
		}
	}
})(typeof exports !== 'undefined' ? exports : window);
