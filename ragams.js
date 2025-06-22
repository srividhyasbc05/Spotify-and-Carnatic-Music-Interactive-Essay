const swaramOffsets={
    0:'s',
    1:"r",
    2:'R',
    3:'g',
    4:'G',
    5:'m',
    6:'M',
    7:'P',
    8:'d',
    9:'D',
    10:'n',
    11:'N',
    12:'S',
}
const ragams={
    "Karaharapriya": 
    {
        'Arohanam': ['s', 'R', 'G', 'm', 'P', 'D', 'n', 'S' ],
        'Avarohanam': ['S', 'N', 'D', 'P', 'm', 'G', 'R', 's']
    },
    "Thodi": 
    {
        'Arohanam': ['s', 'r', 'G', 'm', 'P', 'd', 'N', 'S'],
        'Avarohanam': ['S', 'N', 'd', 'P', 'm', 'G', 'r', 's']
    },
    "Sindubhairavi": 
    {
        'Arohanam': ['s', 'r', 'G', 'm', 'P', 'd', 'N', 'S'],
        'Avarohanam': ['S', 'N', 'd', 'P', 'm', 'G', 'r', 's']
    },
    "Abheri": 
    {
        'Arohanam': ['s', 'G', 'm', 'P', 'N', 'S'],
        'Avarohanam': ['S', 'N', "D", "P", 'm', 'G', 'R', 's']
    },
    "Brindavana Saranga": 
    {
        'Arohanam': ['s', 'R', 'm', 'P', 'N', 'S'],
        'Avarohanam': ['S', 'N', 'P', 'm', 'R', 'G', 's']
    }
}
const shruti= {
    'G':55,
    'G#':56,
    'A': 57,
    'A#': 58
}
const blackKeys=[56, 58, 61, 63, 66, 68, 70, 73, 75]

function getKey(swaram, baseNote) {
    return baseNote + swaramOffsets[swaram];
  }
function drawKeyboard(base){
    const keyboard = document.getElementById('keyboard');
    const selectedRagam = document.getElementById('pickRagam').value;
    const ragamData = ragams[selectedRagam];
    keyboard.innerHTML = '';
    
    for (let i= base; i<base+13; i++){
        const key = document.createElement('div');
        if (blackKeys.includes(i)){
            key.className = 'blackkey'
        }
        else{
            key.className= 'whitekey'
        }
        const swaram = swaramOffsets[i - base];
        if (ragamData.Arohanam.includes(swaram) || ragamData.Avarohanam.includes(swaram)){
            key.innerHTML= swaram
            key.innerHTML+= "<br>"
            key.innerHTML+= i
        }
        key.addEventListener('click', () => {
            const audio = new Audio(`midinotes/${i}.wav`);
            audio.play();
        });

        keyboard.appendChild(key)
    }
}

function display(){
    const selectedRagam = document.getElementById('pickRagam').value;
    const selectedShruti = document.getElementById('pickShruti').value;
    const base = shruti[selectedShruti];
    const ragamData = ragams[selectedRagam];

    const aroDiv = document.getElementById('arohanam');
    const avaDiv = document.getElementById('avarohanam');

    aroDiv.innerHTML = '';
    avaDiv.innerHTML = '';

    ragamData.Arohanam.forEach(swaram => {
        aroDiv.innerHTML += `${swaram} `
    })
    ragamData.Avarohanam.forEach(swaram => {
        avaDiv.innerHTML += `${swaram} `
    })
    drawKeyboard(base)
}
document.getElementById('pickRagam').addEventListener('change', display);
document.getElementById('pickShruti').addEventListener('change', display);

window.onload = () => {
    display()
}