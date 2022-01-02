console.log("\n\n\n\n\n\n\n\nLanguage changer is injected\n\n\n\n\n\n\n")

const isLetter = (str) => str.length === 1 && str.match(/[a-z]/i);
const reverseCase = (c) =>  c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();


const translate = (keyStrokes) => {
    console.log(keyStrokes)

    // All keys here should be lower case
    let en_to_ar_map = {
        "`": "ذ",
        "~": "ّ",
        "q": "ض",
        "w": "ص",
        "e": "ث",
        "r": "ق",
        "t": "ف",
        "y": "غ",
        "u": "ع",
        "i": "ه",
        "I": "÷",
        "o": "خ",
        "O": "×",
        "p": "ح",
        "P": "؛",
        "[": "ج",
        "{": "<",
        "]": "د",
        "}": ">",
        "a": "ش",
        "A": "ِ",
        "s": "س",
        "d": "ي",
        "f": "ب",
        "g": "ل",
        "G": "لأ",
        "h": "ا",
        "H": "أ",
        "j": "ت",
        "J": "ـ",
        "k": "ن",
        "K": "،",
        "l": "م",
        "L": "/",
        ";": "ك",
        "'": "ط",
        "z": "ئ",
        "x": "ء",
        "c": "ؤ",
        "v": "ر",
        "b": "لا",
        "B": "لآ",
        "n": "ى",
        "N": "آ",
        "m": "ة",
        ",": "و",
        "<": ",",
        ".": "ز",
        ">": ".",
        "/": "ظ",
        "?": "؟",
        "Enter": "\n",
    }

    let res = ""

    console.log("Translating: ", keyStrokes)

    keyStrokes.forEach(keyStroke => {
        if (keyStroke === 'Backspace') 
            res = res.substring(0, res.length-1)
        
        else if (en_to_ar_map[keyStroke]) // If you find a map entry, then use it
            res += en_to_ar_map[keyStroke]
        else if (en_to_ar_map[keyStroke.toLowerCase()]) // Try to look for lowercase entry
            res += en_to_ar_map[keyStroke.toLowerCase()]
        else res += keyStroke // Use it as is e.g. " ", "+", "_"

        // console.log(keyStroke)
        // console.log(res)
    })

    return res

}


let keyStrokes = []
let lastFocusedElement = null

document.addEventListener('keyup', (e) => {
    // console.log(e.key)

    const ignore = ['Alt', 'Shift', 'Tab', 'Control', 'CapsLock']
    if (ignore.indexOf(e.key) >= 0)
        return

    if (e.target !== lastFocusedElement) {
        keyStrokes = []
        lastFocusedElement = e.target
    }


    if (isLetter(e.key) && e.getModifierState('CapsLock')){
        // console.log("letter " + e.key + " capslocked")
        // console.log("Push " + reverseCase(e.key) + " instead")
        keyStrokes.push(reverseCase(e.key))
    }
    else keyStrokes.push(e.key)
})

chrome.runtime.onMessage.addListener(

    function (req, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        // console.log(typeof lastFocusedElement)
        // console.log(Object.keys(lastFocusedElement))
        // console.log(lastFocusedElement.nodeName)
        // console.log(lastFocusedElement.value)
        // console.log(translate(keyStrokes))

        lastFocusedElement.value = translate(keyStrokes)
        lastFocusedElement.innerHTML = translate(keyStrokes)
        lastFocusedElement.text = translate(keyStrokes)
    }
);


