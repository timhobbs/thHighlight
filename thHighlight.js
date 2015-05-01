(function () {
    "use strict";

    angular.module("th.highlight", [])
        .directive("thHighlight", thHighlight);

    thHighlight.$inject = ["$timeout"];
    
    function thHighlight($timeout) {
        return {
            restrict: "A",
            scope: {
                thHighlight: "=",
                fadeTimer: "@",
                highlightClass: "@",
                fadeClass: "@"
            },
            link: function (scope, element, attrs) {
                scope.highlightClass = scope.highlightClass || "highlight";
                scope.fadeClass = scope.fadeClass || "highlight-fade";
                scope.fadeTimer = scope.fadeTimer || 1000;

                var loaded = false;
                var el = element[0];
                var previous = el.className;
                var timer;
                var transitionEvent = whichTransitionEvent();

                scope.$watch("thHighlight", function () {
                    // This allows the directive to "skip" highlighting on load
                    if (!loaded) {
                        loaded = true;
                        return
                    }

                    if (timer) {
                        return;
                    }

                    var current = toArray(el.className);

                    var fade = current.indexOf(scope.fadeClass);
                    if (fade !== -1) {
                        current.slice(fade, 1);
                    }

                    if (current.indexOf(scope.highlightClass) == -1) {
                        current.push(scope.highlightClass);
                    }

                    lightIt(current);
                    
                });

                function toArray(val) {
                    if (!val) {
                        return [];
                    }

                    return val.split(" ");
                }

                function lightIt(current) {
                    el.className = current.join(" ");
                    timer = $timeout(function () {
                        if (current.indexOf(scope.fadeClass) == -1) {
                            current.push(scope.fadeClass);
                        }
                        
                        el.className = current.join(" ");
                        el.addEventListener(transitionEvent, transitionEnd);
                    }, scope.fadeTimer);
                }

                // Function from David Walsh: http://davidwalsh.name/css-animation-callback
                function whichTransitionEvent(){
                    var t, el = document.createElement("fakeelement");

                    var transitions = {
                        "transition": "transitionend",
                        "OTransition": "oTransitionEnd",
                        "MozTransition": "transitionend",
                        "WebkitTransition": "webkitTransitionEnd"
                    }

                    for (t in transitions){
                        if (el.style[t] !== undefined) {
                            return transitions[t];
                        }
                    }
                }

                function transitionEnd() {
                    timer = undefined;
                    el.className = previous;
                    el.removeEventListener(transitionEvent, transitionEnd);
                }
            }
        }
    };  

})();