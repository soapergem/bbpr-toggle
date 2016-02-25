// ==UserScript==
// @name BitBucket Pull Request Toggle Buttons
// @author Gordon Myers
// @version 0.5.1.0
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
		
    }
}, false);