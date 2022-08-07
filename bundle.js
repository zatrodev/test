/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ajaxHelpers.js":
/*!*******************************!*\
  !*** ./client/ajaxHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllPlayers": () => (/* binding */ fetchAllPlayers),
/* harmony export */   "fetchSinglePlayer": () => (/* binding */ fetchSinglePlayer),
/* harmony export */   "addNewPlayer": () => (/* binding */ addNewPlayer),
/* harmony export */   "removePlayer": () => (/* binding */ removePlayer)
/* harmony export */ });
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2206-vpi-rm-web-pt";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
    } catch (err) {
        console.error("Failed fetching players.", err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.player;
    } catch (err) {
        console.error("Failed fetching player.", err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(`${APIURL}/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playerObj),
        });

        const result = await response.json();
        if (result.error) throw result.error;
        return;
    } catch (err) {
        console.error("Failed adding player.", err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`, {
            method: "DELETE",
        });
        const result = await response.json();
        if (result.error) throw result.error;
        return;
    } catch (err) {
        console.error("Failed removing player.", err);
    }
};


/***/ }),

/***/ "./client/renderHelpers.js":
/*!*********************************!*\
  !*** ./client/renderHelpers.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAllPlayers": () => (/* binding */ renderAllPlayers),
/* harmony export */   "renderSinglePlayer": () => (/* binding */ renderSinglePlayer),
/* harmony export */   "renderNewPlayerForm": () => (/* binding */ renderNewPlayerForm)
/* harmony export */ });
/* harmony import */ var _ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers.js */ "./client/ajaxHelpers.js");


const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

const renderAllPlayers = (playerList) => {
    // First check if we have any data before trying to render it!
    if (!playerList || !playerList.length) {
        playerContainer.innerHTML = "<h3>No players to display!</h3>";
        return;
    }

    // Loop through the list of players, and construct some HTML to display each one
    let playerContainerHTML = "";
    for (let i = 0; i < playerList.length; i++) {
        const pup = playerList[i];
        let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="remove-button" data-id=${pup.id}>Remove from roster</button>
      </div>
    `;
        playerContainerHTML += pupHTML;
    }

    // After looping, fill the `playerContainer` div with the HTML we constructed above
    playerContainer.innerHTML = playerContainerHTML;

    // Now that the HTML for all players has been added to the DOM,
    // we want to grab those "See details" buttons on each player
    // and attach a click handler to each one
    let detailButtons = [...document.getElementsByClassName("detail-button")];
    for (let i = 0; i < detailButtons.length; i++) {
        const button = detailButtons[i];
        button.addEventListener("click", async () => {
            const singlePlayer = await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.fetchSinglePlayer)(button.dataset.id);
            renderSinglePlayer(singlePlayer);
        });
    }

    let removeButtons = [...document.getElementsByClassName("remove-button")];
    for (let i = 0; i < removeButtons.length; i++) {
      const button = removeButtons[i];
      button.addEventListener("click", async () => {
          await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.removePlayer)(button.dataset.id);
          const players = await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
          renderAllPlayers(players);
      });
  }
};

const renderSinglePlayer = (playerObj) => {
    if (!playerObj || !playerObj.id) {
        playerContainer.innerHTML =
            "<h3>Couldn't find data for this player!</h3>";
        return;
    }

    let pupHTML = `
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : "Unassigned"}</p>
      <p>Breed: ${playerObj.breed}</p>
      <img src="${playerObj.imageUrl}" alt="photo of ${
        playerObj.name
    } the puppy">
      <button id="see-all">Back to all players</button>
    </div>
  `;

    playerContainer.innerHTML = pupHTML;

    const seeAllButton = document.getElementById("see-all");
    seeAllButton.addEventListener("click", async () => {
        const players = await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
        renderAllPlayers(players);
    });
};

const renderNewPlayerForm = () => {
    let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
    newPlayerFormContainer.innerHTML = formHTML;

    let form = document.querySelector("#new-player-form > form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let playerData = {
            name: form.elements.name.value,
            breed: form.elements.breed.value,
        };

        await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.addNewPlayer)(playerData);
        const players = await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)();
        renderAllPlayers(players);

        form.elements.name.value = "";
        form.elements.breed.value = "";
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ajaxHelpers.js */ "./client/ajaxHelpers.js");
/* harmony import */ var _renderHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderHelpers */ "./client/renderHelpers.js");



const init = async () => {
  const players = await (0,_ajaxHelpers_js__WEBPACK_IMPORTED_MODULE_0__.fetchAllPlayers)()
  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderAllPlayers)(players)

  ;(0,_renderHelpers__WEBPACK_IMPORTED_MODULE_1__.renderNewPlayerForm)()
}

init()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdXBweWJvd2wtd29ya3Nob3AvLi9jbGllbnQvYWpheEhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L3JlbmRlckhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3B1cHB5Ym93bC13b3Jrc2hvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHVwcHlib3dsLXdvcmtzaG9wLy4vY2xpZW50L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELFdBQVc7O0FBRS9EO0FBQ1A7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx3Q0FBd0MsT0FBTyxXQUFXLFNBQVM7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQSx3Q0FBd0MsT0FBTyxXQUFXLFNBQVM7QUFDbkU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERrRzs7QUFFbEc7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQyxtQ0FBbUMsT0FBTztBQUMxQztBQUNBLG9CQUFvQixhQUFhLGtCQUFrQixTQUFTO0FBQzVELGdEQUFnRCxPQUFPO0FBQ3ZELGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEJBQTBCO0FBQzdDO0FBQ0E7QUFDQSx1Q0FBdUMsa0VBQWlCO0FBQ3hEO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsbUJBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0EsZ0JBQWdCLDZEQUFZO0FBQzVCLGdDQUFnQyxnRUFBZTtBQUMvQztBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZUFBZTtBQUM5QyxpQ0FBaUMsYUFBYTtBQUM5QztBQUNBLGlCQUFpQixvREFBb0Q7QUFDckUsa0JBQWtCLGdCQUFnQjtBQUNsQyxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUFlO0FBQzdDO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsNkRBQVk7QUFDMUIsOEJBQThCLGdFQUFlO0FBQzdDOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7VUNuSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ3FCOztBQUV2RTtBQUNBLHdCQUF3QixnRUFBZTtBQUN2QyxFQUFFLGlFQUFnQjs7QUFFbEIsRUFBRSxvRUFBbUI7QUFDckI7O0FBRUEsTSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBZGQgeW91ciBjb2hvcnQgbmFtZSB0byB0aGUgY29ob3J0TmFtZSB2YXJpYWJsZSBiZWxvdywgcmVwbGFjaW5nIHRoZSAnQ09IT1JULU5BTUUnIHBsYWNlaG9sZGVyXG5jb25zdCBjb2hvcnROYW1lID0gXCIyMjA2LXZwaS1ybS13ZWItcHRcIjtcbi8vIFVzZSB0aGUgQVBJVVJMIHZhcmlhYmxlIGZvciBmZXRjaCByZXF1ZXN0c1xuY29uc3QgQVBJVVJMID0gYGh0dHBzOi8vZnNhLXB1cHB5LWJvd2wuaGVyb2t1YXBwLmNvbS9hcGkvJHtjb2hvcnROYW1lfS9gO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hBbGxQbGF5ZXJzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzYCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEucGxheWVycztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCBmZXRjaGluZyBwbGF5ZXJzLlwiLCBlcnIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFNpbmdsZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LmVycm9yO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGEucGxheWVyO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIGZldGNoaW5nIHBsYXllci5cIiwgZXJyKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgYWRkTmV3UGxheWVyID0gYXN5bmMgKHBsYXllck9iaikgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzYCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwbGF5ZXJPYmopLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIGFkZGluZyBwbGF5ZXIuXCIsIGVycik7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZVBsYXllciA9IGFzeW5jIChwbGF5ZXJJZCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7QVBJVVJMfS9wbGF5ZXJzLyR7cGxheWVySWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB0aHJvdyByZXN1bHQuZXJyb3I7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCByZW1vdmluZyBwbGF5ZXIuXCIsIGVycik7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGFkZE5ld1BsYXllciwgZmV0Y2hBbGxQbGF5ZXJzLCBmZXRjaFNpbmdsZVBsYXllciwgcmVtb3ZlUGxheWVyIH0gZnJvbSBcIi4vYWpheEhlbHBlcnMuanNcIjtcblxuY29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGwtcGxheWVycy1jb250YWluZXJcIik7XG5jb25zdCBuZXdQbGF5ZXJGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXctcGxheWVyLWZvcm1cIik7XG5cbmV4cG9ydCBjb25zdCByZW5kZXJBbGxQbGF5ZXJzID0gKHBsYXllckxpc3QpID0+IHtcbiAgICAvLyBGaXJzdCBjaGVjayBpZiB3ZSBoYXZlIGFueSBkYXRhIGJlZm9yZSB0cnlpbmcgdG8gcmVuZGVyIGl0IVxuICAgIGlmICghcGxheWVyTGlzdCB8fCAhcGxheWVyTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiPGgzPk5vIHBsYXllcnMgdG8gZGlzcGxheSE8L2gzPlwiO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBsaXN0IG9mIHBsYXllcnMsIGFuZCBjb25zdHJ1Y3Qgc29tZSBIVE1MIHRvIGRpc3BsYXkgZWFjaCBvbmVcbiAgICBsZXQgcGxheWVyQ29udGFpbmVySFRNTCA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHB1cCA9IHBsYXllckxpc3RbaV07XG4gICAgICAgIGxldCBwdXBIVE1MID0gYFxuICAgICAgPGRpdiBjbGFzcz1cInNpbmdsZS1wbGF5ZXItY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWluZm9cIj5cbiAgICAgICAgICA8cCBjbGFzcz1cInB1cC10aXRsZVwiPiR7cHVwLm5hbWV9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzPVwicHVwLW51bWJlclwiPiMke3B1cC5pZH08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW1nIHNyYz1cIiR7cHVwLmltYWdlVXJsfVwiIGFsdD1cInBob3RvIG9mICR7cHVwLm5hbWV9IHRoZSBwdXBweVwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZGV0YWlsLWJ1dHRvblwiIGRhdGEtaWQ9JHtwdXAuaWR9PlNlZSBkZXRhaWxzPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmUtYnV0dG9uXCIgZGF0YS1pZD0ke3B1cC5pZH0+UmVtb3ZlIGZyb20gcm9zdGVyPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICAgICAgICBwbGF5ZXJDb250YWluZXJIVE1MICs9IHB1cEhUTUw7XG4gICAgfVxuXG4gICAgLy8gQWZ0ZXIgbG9vcGluZywgZmlsbCB0aGUgYHBsYXllckNvbnRhaW5lcmAgZGl2IHdpdGggdGhlIEhUTUwgd2UgY29uc3RydWN0ZWQgYWJvdmVcbiAgICBwbGF5ZXJDb250YWluZXIuaW5uZXJIVE1MID0gcGxheWVyQ29udGFpbmVySFRNTDtcblxuICAgIC8vIE5vdyB0aGF0IHRoZSBIVE1MIGZvciBhbGwgcGxheWVycyBoYXMgYmVlbiBhZGRlZCB0byB0aGUgRE9NLFxuICAgIC8vIHdlIHdhbnQgdG8gZ3JhYiB0aG9zZSBcIlNlZSBkZXRhaWxzXCIgYnV0dG9ucyBvbiBlYWNoIHBsYXllclxuICAgIC8vIGFuZCBhdHRhY2ggYSBjbGljayBoYW5kbGVyIHRvIGVhY2ggb25lXG4gICAgbGV0IGRldGFpbEJ1dHRvbnMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRldGFpbC1idXR0b25cIildO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGV0YWlsQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkZXRhaWxCdXR0b25zW2ldO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpbmdsZVBsYXllciA9IGF3YWl0IGZldGNoU2luZ2xlUGxheWVyKGJ1dHRvbi5kYXRhc2V0LmlkKTtcbiAgICAgICAgICAgIHJlbmRlclNpbmdsZVBsYXllcihzaW5nbGVQbGF5ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgcmVtb3ZlQnV0dG9ucyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVtb3ZlLWJ1dHRvblwiKV07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW1vdmVCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBidXR0b24gPSByZW1vdmVCdXR0b25zW2ldO1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgcmVtb3ZlUGxheWVyKGJ1dHRvbi5kYXRhc2V0LmlkKTtcbiAgICAgICAgICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XG4gICAgICAgICAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKTtcbiAgICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyU2luZ2xlUGxheWVyID0gKHBsYXllck9iaikgPT4ge1xuICAgIGlmICghcGxheWVyT2JqIHx8ICFwbGF5ZXJPYmouaWQpIHtcbiAgICAgICAgcGxheWVyQ29udGFpbmVyLmlubmVySFRNTCA9XG4gICAgICAgICAgICBcIjxoMz5Db3VsZG4ndCBmaW5kIGRhdGEgZm9yIHRoaXMgcGxheWVyITwvaDM+XCI7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcHVwSFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2luZ2xlLXBsYXllci12aWV3XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWluZm9cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJwdXAtdGl0bGVcIj4ke3BsYXllck9iai5uYW1lfTwvcD5cbiAgICAgICAgPHAgY2xhc3M9XCJwdXAtbnVtYmVyXCI+IyR7cGxheWVyT2JqLmlkfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgICAgPHA+VGVhbTogJHtwbGF5ZXJPYmoudGVhbSA/IHBsYXllck9iai50ZWFtLm5hbWUgOiBcIlVuYXNzaWduZWRcIn08L3A+XG4gICAgICA8cD5CcmVlZDogJHtwbGF5ZXJPYmouYnJlZWR9PC9wPlxuICAgICAgPGltZyBzcmM9XCIke3BsYXllck9iai5pbWFnZVVybH1cIiBhbHQ9XCJwaG90byBvZiAke1xuICAgICAgICBwbGF5ZXJPYmoubmFtZVxuICAgIH0gdGhlIHB1cHB5XCI+XG4gICAgICA8YnV0dG9uIGlkPVwic2VlLWFsbFwiPkJhY2sgdG8gYWxsIHBsYXllcnM8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICAgIHBsYXllckNvbnRhaW5lci5pbm5lckhUTUwgPSBwdXBIVE1MO1xuXG4gICAgY29uc3Qgc2VlQWxsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWUtYWxsXCIpO1xuICAgIHNlZUFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKCk7XG4gICAgICAgIHJlbmRlckFsbFBsYXllcnMocGxheWVycyk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyTmV3UGxheWVyRm9ybSA9ICgpID0+IHtcbiAgICBsZXQgZm9ybUhUTUwgPSBgXG4gICAgPGZvcm0+XG4gICAgICA8bGFiZWwgZm9yPVwibmFtZVwiPk5hbWU6PC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCIgLz5cbiAgICAgIDxsYWJlbCBmb3I9XCJicmVlZFwiPkJyZWVkOjwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYnJlZWRcIiAvPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgPC9mb3JtPlxuICBgO1xuICAgIG5ld1BsYXllckZvcm1Db250YWluZXIuaW5uZXJIVE1MID0gZm9ybUhUTUw7XG5cbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXBsYXllci1mb3JtID4gZm9ybVwiKTtcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHBsYXllckRhdGEgPSB7XG4gICAgICAgICAgICBuYW1lOiBmb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsXG4gICAgICAgICAgICBicmVlZDogZm9ybS5lbGVtZW50cy5icmVlZC52YWx1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBhZGROZXdQbGF5ZXIocGxheWVyRGF0YSk7XG4gICAgICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBmZXRjaEFsbFBsYXllcnMoKTtcbiAgICAgICAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKTtcblxuICAgICAgICBmb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUgPSBcIlwiO1xuICAgICAgICBmb3JtLmVsZW1lbnRzLmJyZWVkLnZhbHVlID0gXCJcIjtcbiAgICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZldGNoQWxsUGxheWVycyB9IGZyb20gJy4vYWpheEhlbHBlcnMuanMnXG5pbXBvcnQgeyByZW5kZXJBbGxQbGF5ZXJzLCByZW5kZXJOZXdQbGF5ZXJGb3JtIH0gZnJvbSAnLi9yZW5kZXJIZWxwZXJzJ1xuXG5jb25zdCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwbGF5ZXJzID0gYXdhaXQgZmV0Y2hBbGxQbGF5ZXJzKClcbiAgcmVuZGVyQWxsUGxheWVycyhwbGF5ZXJzKVxuXG4gIHJlbmRlck5ld1BsYXllckZvcm0oKVxufVxuXG5pbml0KCkiXSwic291cmNlUm9vdCI6IiJ9