// Color preview div
const colorPreview = document.getElementById("colorPreview");

// Color changers
const colorInput = document.getElementById("colorInput");
const colorRed = document.getElementById("colorRed");
const colorGreen = document.getElementById("colorGreen");
const colorBlue = document.getElementById("colorBlue");


// Color values for color changers
const redValue = document.getElementById("redValue");
const greenValue = document.getElementById("greenValue");
const blueValue = document.getElementById("blueValue");

// Hexadecimal letter values
const hexadecimal = { 10: "a", 11: "b", 12: "c", 13: "d", 14: "e", 15: "f" };

// Type-Code
const rgbResult = document.getElementById("rgb");
const hexResult = document.getElementById("hex");
const cmykResult = document.getElementById("cmyk");
const hsvResult = document.getElementById("hsv");


// Input number values
redValue.addEventListener("input", () => checkValue(redValue));
greenValue.addEventListener("input", () => checkValue(greenValue));
blueValue.addEventListener("input", () => checkValue(blueValue));


// Controlers

function getObjectKey(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function checkValue(sender) {
    if (sender.value < 0 || sender.value == "") sender.value = 0;
    else if (sender.value > 255) sender.value = 255;
    toggleValues();
}

function toggleValues() {
    colorRed.value = redValue.value;
    colorGreen.value = greenValue.value;
    colorBlue.value = blueValue.value;
    toggleRangeChange();
}

function displayResults() {
    let [r, g, b] = [redValue.value, greenValue.value, blueValue.value];
    let hex = RGBtoHEX(r, g, b).toUpperCase();
    let [c, m, y, k] = RGBtoCMYK(r, g, b);
    let [h, s, v] = RGBtoHSV(r, g, b);

    rgbResult.innerText = `( ${r}, ${g}, ${b} )`;
    hexResult.innerText = hex;
    cmykResult.innerText = `( ${c}%, ${m}%, ${y}%, ${k}% )`;
    hsvResult.innerText = `( ${h}°, ${s}%, ${v}% )`;
}

function toggleChange(sender) {
    if (sender == "color") toggleColorChoose();
    else toggleRangeChange();

    displayResults();
}

// input[type="color"]
function toggleColorChoose() {
    colorPreview.style.backgroundColor = colorInput.value;
    rgb = HEXtoRGB(colorInput.value);
    colorRed.value = rgb[0];
    colorGreen.value = rgb[1];
    colorBlue.value = rgb[2];
    changeRGBValues();
}

// input[type="range"]
function toggleRangeChange() {
    var r = colorRed.value;
    var g = colorGreen.value;
    var b = colorBlue.value;

    colorPreview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    colorInput.value = RGBtoHEX(r, g, b);
    changeRGBValues();
}

// RGB numeric values
function changeRGBValues() {
    redValue.value = colorRed.value;
    greenValue.value = colorGreen.value;
    blueValue.value = colorBlue.value;
}


// Converters
function RGBtoHEX(...rgb) {
    let hex = "#";

    for (let value of rgb) {
        let a = parseInt(value / 16);
        let b = value % 16;
        if (a >= 10) a = hexadecimal[a];
        if (b >= 10) b = hexadecimal[b];
        hex += a.toString() + b.toString();
    }

    return hex;
}

function HEXtoRGB(hex) {
    hex = hex.slice(1);
    let rgb = [];

    for (let i = 0; i < hex.length; i += 2) {
        let a = hex[i], b = hex[i + 1];
        if (a >= "a" && a <= "f") a = getObjectKey(hexadecimal, a);
        if (b >= "a" && b <= "f") b = getObjectKey(hexadecimal, b);
        rgb.push(parseInt(a) * 16 + parseInt(b));
    }
    return rgb;
}

function RGBtoCMYK(r, g, b) {
    let c, m, y, k;

    r /= 255;
    g /= 255;
    b /= 255;

    k = 1 - Math.max(r, g, b);
    if (k == 1) {
        c = 0; m = 0; y = 0;
    }
    else {
        c = Math.round(((1 - r - k) / (1 - k)) * 100);
        m = Math.round(((1 - g - k) / (1 - k)) * 100);
        y = Math.round(((1 - b - k) / (1 - k)) * 100);
    }

    k = Math.round(k * 100)

    return [c, m, y, k];
}

function RGBtoHSV(r, g, b) {
    let h, s, v;
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let difference = max - min;

    // Calculating Hue -> h
    if (max == min) h = 0;
    else if (max == r) h = (60 * ((g - b) / difference) + 360) % 360;
    else if (max == g) h = (60 * ((b - r) / difference) + 120) % 360;
    else if (max == b) h = (60 * ((r - g) / difference) + 240) % 360;

    h = Math.round(h);

    // Calculating Saturation -> s
    if (max == 0) s = 0;
    else s = (difference / max) * 100;

    s = Math.round(s);

    // Calculating Value -> v
    v = Math.round(max * 100);

    return [h, s, v];
}

// Copy Code of Color
function copyCode(type) {
    let code;
    switch (type) {
        case 'rgb':
            code = rgbResult;
            break;
        case 'hex':
            code = hexResult;
            break;
        case 'cmyk':
            code = cmykResult;
            break;
        case 'hsv':
            code = hsvResult;
            break;
    }

    navigator.clipboard.writeText(code.innerText);
    alert("Code was successfully copied.");
}