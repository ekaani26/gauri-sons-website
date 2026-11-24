// const fixedCountryCode = "us";  // Change to the desired country code
// // Flag to toggle between auto and fixed country code
// let useFixedCountryCode = false;  // Set this to true for a fixed country code, false for auto country detection

// // Function to initialize intlTelInput with different configurations
// function initializePhoneInput(inputId) {
//     const phoneInput = document.querySelector(`#${inputId}`);

//     // Destroy the previous instance if it exists
//     if (window[`iti_${inputId}`]) {
//         window[`iti_${inputId}`].destroy();
//     }

//     // Initialize international telephone input with conditional country setting
//     window[`iti_${inputId}`] = window.intlTelInput(phoneInput, {
//         initialCountry: useFixedCountryCode ? fixedCountryCode : "auto",  // Fixed or auto country based on the flag
//         nationalMode: false,  // Forces the phone number to be entered in international format
//         separateDialCode: true,  // Show the country dial code next to the flag
//         geoIpLookup: function (callback) {
//             if (!useFixedCountryCode) {
//                 fetch("https://ipinfo.io/json?token=d41d9a62b0c924")  // Replace with your token
//                     .then(response => response.json())
//                     .then(data => {
//                         callback(data.country);
//                     })
//                     .catch(() => {
//                         callback("us");  // Default to 'us' if geo lookup fails
//                     });
//             } else {
//                 callback(fixedCountryCode);  // Use the fixed country code
//             }
//         },
//         utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
//     });
// }

// // Function to toggle between auto and fixed country mode
// function toggleCountryMode() {
//     useFixedCountryCode = !useFixedCountryCode;  // Toggle between true and false
//     initializePhoneInput('mobile1');
//     initializePhoneInput('mobile2');
//     initializePhoneInput('mobile3');
//     initializePhoneInput('mobile4');
//     initializePhoneInput('mobile5');
//     initializePhoneInput('mobile6');
//     initializePhoneInput('mobile7');
//     initializePhoneInput('mobile8');
//     initializePhoneInput('mobile9');
//     initializePhoneInput('mobile10');
//     initializePhoneInput('mobile11');
//     initializePhoneInput('mobile12');
//     initializePhoneInput('mobile13');
//     initializePhoneInput('mobile14');
//     initializePhoneInput('mobile15');
//     initializePhoneInput('mobile16');
//     initializePhoneInput('mobile17');
//     initializePhoneInput('mobile18');
//     initializePhoneInput('mobile19');
//     initializePhoneInput('mobile20');
//     initializePhoneInput('mobile21');
//     initializePhoneInput('mobile22');
//     initializePhoneInput('mobile23');
//     initializePhoneInput('mobile24');
//     initializePhoneInput('mobile25');
//     initializePhoneInput('mobile26');
//     initializePhoneInput('mobile27');
//     initializePhoneInput('mobile28');
//     initializePhoneInput('mobile29');
//     initializePhoneInput('mobile30');
//     initializePhoneInput('mobile31');
// }

// // Call the function to initialize the phone inputs when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//     initializePhoneInput('mobile1');
//     initializePhoneInput('mobile2');
//     initializePhoneInput('mobile3');
//     initializePhoneInput('mobile4');
//     initializePhoneInput('mobile5');
//     initializePhoneInput('mobile6');
//     initializePhoneInput('mobile7');
//     initializePhoneInput('mobile8');
//     initializePhoneInput('mobile9');
//     initializePhoneInput('mobile10');
//     initializePhoneInput('mobile11');
//     initializePhoneInput('mobile12');
//     initializePhoneInput('mobile13');
//     initializePhoneInput('mobile14');
//     initializePhoneInput('mobile15');
//     initializePhoneInput('mobile16');
//     initializePhoneInput('mobile17');
//     initializePhoneInput('mobile18');
//     initializePhoneInput('mobile19');
//     initializePhoneInput('mobile20');
//     initializePhoneInput('mobile21');
//     initializePhoneInput('mobile22');
//     initializePhoneInput('mobile23');
//     initializePhoneInput('mobile24');
//     initializePhoneInput('mobile25');
//     initializePhoneInput('mobile26');
//     initializePhoneInput('mobile27');
//     initializePhoneInput('mobile28');
//     initializePhoneInput('mobile29');
//     initializePhoneInput('mobile30');
//     initializePhoneInput('mobile31');
// });

// // Collect user's IP, country, and country code dynamically
// fetch("https://ipinfo.io/json?token=d41d9a62b0c924")  // Replace with your token
//     .then(response => response.json())
//     .then(data => {
//         document.querySelectorAll("[id^=af4_]").forEach(el => el.value = data.ip);  // User's actual IP
//         document.querySelectorAll("[id^=af5_]").forEach(el => el.value = data.city + ", " + data.region + ", " + data.country);  // Country info
//         document.querySelectorAll("[id^=af6_]").forEach(el => el.value = data.country);  // Country code (alpha-2 code)
//     });

// // Redirect to submit.html with form values
// function redirectToSubmit(event, formId) {
//     event.preventDefault(); // Prevent default form submission
//     const form = document.getElementById(formId);
//     const formData = new FormData(form);

//     // Email validation
//     const email = form.querySelector('input[type="email"]').value;
//     const emailError = form.querySelector('.error');
//     if (!validateEmail(email)) {
//         emailError.textContent = "Invalid email address";
//         return false;
//     } else {
//         emailError.textContent = "";
//     }

//     // Get selected phone number with country code
//     const phoneInputId = form.querySelector('input[type="tel"]').id;
//     const phoneNumber = window[`iti_${phoneInputId}`].getNumber();
//     formData.set("mobile", phoneNumber);

//     // Build query string
//     const params = new URLSearchParams();
//     formData.forEach((value, key) => params.append(key, value));

//     // Redirect to submit.html with parameters
//     window.location.href = `submit.html?${params.toString()}`;
// }

// // Email validation function
// function validateEmail(email) {
//     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return re.test(email);
// }



// New Code


// ============================================================
//  TOKEN ROTATION SYSTEM - Auto daily rotation + expiry alert
// ============================================================

const ipinfoTokens = [
    "5c0e2a785ac659",
    "d41d9a62b0c924",
    "b4d0d57cb97c2e",
    "25c7a588411810",
    "ef4a1b5d87a509",
    "242dbaab86b2fc",
    "b35d6705396714",
    "5b4340d1b9b9c7",
    "24bd9c0a612f37",
    "a3423fda47bb01",
    "3ec1eb2923059e",
    "73d52071d9cd48",
    "abbed82c90932b",
    "7fc3d73857d88c",
    "93ff4c0cb37bc8",
    "785c7cb472ad69",
    "2949b78d74c3f5",
    "463651e2d6a050",
    "3fcccac4afce1d",
    "4f7cc714a65d99",
    "0f93b51a5aa374",
    "65563859ce281f",
    "45030a01dea4ee",
    "ec993fb25535dd",
    "9e6196be02c963",
    "eef95b000ba0fb",
    "d323ca7fcd2a1f",
    "1d2f5bb0ae5b93",
    "bac747bc21faca",
    "141554fb2a8e60",
    "cc9ff2af7f8f62",
    "05b53c7a8bc9b2",
    "55810d3406efaa",
    "a45bd5463d6d4c",
    "fb2f26867c63d5",
    "da7ef536d5e127",
    "748909e84bd97d",
    "b1d9250bf4808c",
    "104b6807bb32a2",
    "ab0d1a05547f78",
    "13406a27f184c5",
    "2c0a119f539c2c",
    "167015113efc5b",
    "6d1be328f3eb3a",
    "ba82b8ce69e40a",
    "2f8bccdb7160ca",
    "f98cd561986505",
    "82f37ee119249d",
    "506c8efee4026c"
];

// Token rotation logic - changes every 24 hours automatically (sequence wise)
function getCurrentToken() {
    const msPerDay = 24 * 60 * 60 * 1000;
    // Uses elapsed days since Unix epoch to pick token index
    const dayIndex = Math.floor(Date.now() / msPerDay);
    const tokenIndex = dayIndex % ipinfoTokens.length;
    return { token: ipinfoTokens[tokenIndex], index: tokenIndex };
}

// Fetch with auto token rotation + expiry/error detection
async function fetchIPInfo() {
    const msPerDay = 24 * 60 * 60 * 1000;
    const startDayIndex = Math.floor(Date.now() / msPerDay);

    for (let attempt = 0; attempt < ipinfoTokens.length; attempt++) {
        const tokenIndex = (startDayIndex + attempt) % ipinfoTokens.length;
        const token = ipinfoTokens[tokenIndex];

        try {
            const response = await fetch(`https://ipinfo.io/json?token=${token}`);
            const data = await response.json();

            // Check if token is expired/invalid (ipinfo returns error object)
            if (data.error) {
                console.warn(`⚠️ Token [${tokenIndex + 1}/${ipinfoTokens.length}] "${token}" is EXPIRED or INVALID. Reason: ${data.error.message || data.error}`);
                notifyExpiredToken(token, tokenIndex);
                continue; // Try next token
            }

            if (attempt > 0) {
                console.info(`✅ Switched to Token [${tokenIndex + 1}/${ipinfoTokens.length}]: "${token}" (${attempt} token(s) were expired)`);
            } else {
                console.info(`✅ Active Token [${tokenIndex + 1}/${ipinfoTokens.length}]: "${token}"`);
            }

            return data; // Success - return data

        } catch (err) {
            console.warn(`⚠️ Token [${tokenIndex + 1}/${ipinfoTokens.length}] "${token}" fetch failed:`, err.message);
            notifyExpiredToken(token, tokenIndex);
        }
    }

    // All tokens failed
    console.error("🚨 ALL TOKENS EXPIRED OR FAILED! Please add new tokens.");
    // alert("🚨 All IPInfo tokens have expired! Please update tokens in phone-input.js");
    return null;
}

// Notify when a token is expired - console + optional UI alert
function notifyExpiredToken(token, index) {
    const message = `🔴 IPInfo Token Expired!\nToken #${index + 1}: "${token}"\nPlease replace this token in your token list.`;
    console.error(message);

    // Show a one-time visible notification on page (won't spam multiple alerts)
    // if (!window._tokenAlertShown) {
    //     window._tokenAlertShown = true;
    //     const banner = document.createElement('div');
    //     banner.style.cssText = `
    //         position: fixed; top: 0; left: 0; width: 100%; z-index: 99999;
    //         background: #ff4444; color: white; padding: 10px 16px;
    //         font-size: 14px; font-family: sans-serif; text-align: center;
    //     `;
    //     banner.innerHTML = `⚠️ <strong>Token #${index + 1} ("${token}") is expired!</strong> Auto-switching to next available token. Please update your token list. <button onclick="this.parentElement.remove()" style="margin-left:12px;background:white;color:#ff4444;border:none;padding:2px 8px;cursor:pointer;border-radius:3px;">✕</button>`;
    //     document.body.prepend(banner);
    // }
}

// ============================================================
//  REST OF YOUR ORIGINAL CODE (unchanged logic, updated fetch)
// ============================================================

const fixedCountryCode = "us";
let useFixedCountryCode = false;

function initializePhoneInput(inputId) {
    const phoneInput = document.querySelector(`#${inputId}`);
    if (!phoneInput) return;

    if (window[`iti_${inputId}`]) {
        window[`iti_${inputId}`].destroy();
    }

    window[`iti_${inputId}`] = window.intlTelInput(phoneInput, {
        initialCountry: useFixedCountryCode ? fixedCountryCode : "auto",
        nationalMode: false,
        separateDialCode: true,
        geoIpLookup: function (callback) {
            if (!useFixedCountryCode) {
                fetchIPInfo().then(data => {
                    callback(data ? data.country : "us");
                });
            } else {
                callback(fixedCountryCode);
            }
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
}

function toggleCountryMode() {
    useFixedCountryCode = !useFixedCountryCode;
    for (let i = 1; i <= 31; i++) {
        initializePhoneInput(`mobile${i}`);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    for (let i = 1; i <= 31; i++) {
        initializePhoneInput(`mobile${i}`);
    }
});

// Collect user's IP, country, and country code dynamically
fetchIPInfo().then(data => {
    if (!data) return;
    document.querySelectorAll("[id^=af4_]").forEach(el => el.value = data.ip);
    document.querySelectorAll("[id^=af5_]").forEach(el => el.value = data.city + ", " + data.region + ", " + data.country);
    document.querySelectorAll("[id^=af6_]").forEach(el => el.value = data.country);
});

// Redirect to submit.html with form values
function redirectToSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    const formData = new FormData(form);

    const email = form.querySelector('input[type="email"]').value;
    const emailError = form.querySelector('.error');
    if (!validateEmail(email)) {
        emailError.textContent = "Invalid email address";
        return false;
    } else {
        emailError.textContent = "";
    }

    const phoneInputId = form.querySelector('input[type="tel"]').id;
    const phoneNumber = window[`iti_${phoneInputId}`].getNumber();
    formData.set("mobile", phoneNumber);

    const params = new URLSearchParams();
    formData.forEach((value, key) => params.append(key, value));

    window.location.href = `submit.html?${params.toString()}`;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}