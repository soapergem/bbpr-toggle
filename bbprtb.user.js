// ==UserScript==
// @name BitBucket Pull Request Toggle Buttons
// @author Gordon Myers
// @version 0.5.1.1
// @match https://bitbucket.org/*/pull-request*
// ==/UserScript==
window.addEventListener('load', function() {
    var buttons = document.getElementById('pullrequest-actions');
    if (buttons) {
        
		var buttonContainer = document.createElement('div');
        buttonContainer.className = 'aui-buttons';
        buttonContainer.style.marginRight = '10px';
		
		var button1 = document.createElement('button');
		button1.className = 'aui-button';
		button1.innerHTML = 'Activate Toggle';
		button1.id = 'fr-toggle-enable';
		buttonContainer.appendChild(button1);
		
		var ignoreWhitespaceRegex = new RegExp('[?&]w=1');
		if (!ignoreWhitespaceRegex.test(document.location.toString())) {
			var button2 = document.createElement('button');
			button2.className = 'aui-button';
			button2.innerHTML = 'Ignore Spacing';
			button2.id = 'fr-ignore-whitespace';
			buttonContainer.appendChild(button2);
		}
		
		buttons.insertBefore(buttonContainer, buttons.childNodes[0]);
        
        button1.addEventListener('click', function() {
            
            var containers = document.getElementsByClassName('diff-container');
            for (var i = 0; i < containers.length; i++) {
                var container = containers[i];
                var content = container.getElementsByClassName('refract-container');
                if (content.length == 0) {
                    content = container.getElementsByClassName('diff-note');
                }
				if (content.length == 0) {
					content = container.getElementsByClassName('content-container');
				}
                var actions = container.getElementsByClassName('diff-actions');
                if (actions[0] && content[0]) {
                    var toggle = document.createElement('div');
                    toggle.className = 'aui-buttons';
                    toggle.innerHTML = '<button class="aui-button aui-button-light fr-toggle-button">Toggle</button>';
                    actions[0].insertBefore(toggle, actions[0].childNodes[0]);
                    toggle.addEventListener('click', function(evt) {
						evt = evt || window.event;
						var container = evt.srcElement || evt.target;
						while (!~container.className.indexOf('diff-container')) {
							container = container.parentNode;
							if (container.nodeType != 1) return;
						}
						var content = container.getElementsByClassName('refract-container');
						if (content.length == 0) {
							content = container.getElementsByClassName('diff-note');
						}
						if (content.length == 0) {
							content = container.getElementsByClassName('content-container');
						}
                        content[0].style.display = (content[0].style.display == 'none') ? "" : 'none';
                    });
                }
            }
            
            var button = document.getElementById('fr-toggle-enable');
            if (button) {
				var buttonContainer = button.parentNode;
				if (buttonContainer.children.length == 1) {
					buttonContainer.parentNode.removeChild(buttonContainer);
				} else {
					buttonContainer.removeChild(button);
				}
            }
        });
		
		if (button2) {
			button2.addEventListener('click', function() {
				var url = document.location.toString();
				var hashPosition = url.indexOf('#');
				if (hashPosition > -1) {
					var remaining = url.length - hashPosition;
					var before = url.substr(0, hashPosition);
					var after = url.substr(hashPosition, remaining);
				} else {
					var before = url;
					var after = "";
				}
				var queryPosition = before.indexOf('?');
				if (queryPosition > -1) {
					before += '&w=1';
				} else {
					before += '?w=1';
				}
				document.location = before + after;
			});
		}
    }
}, false);