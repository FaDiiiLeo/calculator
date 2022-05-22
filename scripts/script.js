const themeSelector = document.querySelector('#themeSelector');
const themeStyleSheet = document.querySelector('#themeStyleSheet');
let themeValue = 1;

function lastSelectedTheme(){
    themeValue = localStorage.getItem('selectedTheme');
    if(themeValue === '1'){
        themeStyleSheet.href = 'styles/themes/theme-1.css';
        themeSelector.value = localStorage.getItem('toggleValue');
    }
    else if(themeValue === '2'){
        themeStyleSheet.href = 'styles/themes/theme-2.css';
        themeSelector.value = localStorage.getItem('toggleValue');
    }
    else if(themeValue === '3'){
        themeStyleSheet.href = 'styles/themes/theme-3.css';
        themeSelector.value = localStorage.getItem('toggleValue');
    }
}

function selectTheme(){
    lastSelectedTheme();
    themeSelector.addEventListener('input',function(){
        themeValue = themeSelector.value;
        if(themeValue === '1'){
            themeStyleSheet.href = 'styles/themes/theme-1.css';
        }
        else if(themeValue === '2'){
            themeStyleSheet.href = 'styles/themes/theme-2.css';
        }
        else if(themeValue === '3'){
            themeStyleSheet.href = 'styles/themes/theme-3.css';
        }
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('selectedTheme', themeValue);
            localStorage.setItem('toggleValue', themeValue);
        }else {
            console.log('Sorry! No Web Storage support');
        }
    })
}

selectTheme();
