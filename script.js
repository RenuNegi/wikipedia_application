(function () {
    var appData;

    function render() {
        document.getElementById('searchContent').innerHTML = "";
        for (i in appData) {
            document.getElementById('searchContent').innerHTML += `<li class="search-list"> 
                <div class="search-content-heading">
                <a href="http://en.wikipedia.org/?curid=${appData[i].pageid}" title="${appData[i].title}">
                <span class="searchmatch">${appData[i].title}</span>
                </a>
                </div>
                <div class="search-result"> ${appData[i].snippet}</div>
                <div class="search-result-content">${appData[i].size} bytes (${appData[i].wordcount} words) - ${formatDate(appData[i].timestamp)}</div>
                </li>`
        }
    }

    function formatDate(timestamp) {
        return (new Date(timestamp)).toDateString()
    }

    function sortByKey(inputArr, inputKey) {
        inputArr.sort(function (value1, value2) {
            if (value1[inputKey] > value2[inputKey])
                return 1;
            else
                return -1;
        });
    }

    function getJSON(url, success) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                success(null, xhr.response);
            }
            else {
                success(status, xhr.response);
            }
        };
        xhr.send();

    };

    window.onload = function () {
        var sortingID = document.getElementById("sortArray");
        sortingID.addEventListener('change', function (e) {
            var userChoice = sortingID.options[sortingID.selectedIndex].value;
            if (userChoice) {
                sortByKey(appData, userChoice);
                render();
            }
        }, false);
    }

    getJSON('https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Albert%20Einstein&utf8=&format=json&origin=*',
        function (error, data) {
            if (error !== null) {
                console.log('error' + error);
            }
            else {
                appData = data.query.search;
                render();
            }
        });
})();