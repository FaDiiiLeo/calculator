const themeSelector = document.querySelector('#themeSelector');
let themeValue = 1;

function lastSelectedTheme(){
    themeValue = localStorage.getItem('selectedTheme');
    if(themeValue === '1'){
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'theme-1');
        themeSelector.value = localStorage.getItem('toggleValue');
    }
    else if(themeValue === '2'){
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'theme-2');
        themeSelector.value = localStorage.getItem('toggleValue');
    }
    else if(themeValue === '3'){
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'theme-3');
        themeSelector.value = localStorage.getItem('toggleValue');
    }
}

function selectTheme(){
    lastSelectedTheme();
    themeSelector.addEventListener('input',function(){
        themeValue = themeSelector.value;
        if(themeValue === '1'){
            document.body.removeAttribute('class');
            document.body.setAttribute('class', 'theme-1');
        }
        else if(themeValue === '2'){
            document.body.removeAttribute('class');
            document.body.setAttribute('class', 'theme-2');
        }
        else if(themeValue === '3'){
            document.body.removeAttribute('class');
            document.body.setAttribute('class', 'theme-3');
        }
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('selectedTheme', themeValue);
            localStorage.setItem('toggleValue', themeValue);
        }else {
            console.log('Sorry! No Web Storage support');
        }
    });
}

selectTheme();