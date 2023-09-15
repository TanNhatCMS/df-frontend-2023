let currentLanguage = "en";

const englishButton = document.getElementById("english-button");
const vietnameseButton = document.getElementById("vietnamese-button");
const searchInputs = document.getElementById("search-input");
const selectTopic = document.getElementById("select-topic");


let languageData;

englishButton.addEventListener("click", function (e) {
    e.preventDefault();
    currentLanguage = "en";
    updateTextByLanguage();
});


vietnameseButton.addEventListener("click", function (e) {
    e.preventDefault();
    currentLanguage = "vi";
    updateTextByLanguage();
});

function updateTextByLanguage() {
    const elementsToChange = document.querySelectorAll("[data-i18n]");
    if (searchInputs.placeholder)
        searchInputs.placeholder = languageData[currentLanguage]["searchPlaceholder"];
    if (selectTopic.options[0].textContent)
        selectTopic.options[0].textContent = languageData[currentLanguage]["selectTopic"];
    elementsToChange.forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (languageData && languageData[currentLanguage] && languageData[currentLanguage][key]) {
            element.textContent = languageData[currentLanguage][key];
        }
    });
}

const getDelete = (name) => {
    let deleteName = "";
    if (currentLanguage === "en") {
        deleteName = languageData[currentLanguage]["deleteBookConfirmation"] + " <b>" + name + "</b> book ?";
    } else {
        deleteName = languageData[currentLanguage]["deleteBookConfirmation"] + " <b>" + name + "</b> không?";
    }
    return deleteName;
}
const getLanguage = (key) => {
    return languageData[currentLanguage][key] ? languageData[currentLanguage][key] : "";
}
const getLanguages = async () => {
    if (languageData && languageData["vi"] && languageData["en"]) {
        return;
    } else {
        try {
            const resLanguages = await fetch(`${currentUrl}database/languages.json`);
            if (resLanguages.ok) {
                languageData = await resLanguages.json();
                console.log("Languages", languageData);
                updateTextByLanguage();
            } else {
                console.error("Failed to fetch language data. Status code:", resLanguages.status);
            }
        } catch (error) {
            console.error("Error fetching language data:", error);
        }
    }
}

getLanguages();

