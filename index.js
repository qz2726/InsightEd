
const sections = [
    {
        icon: "🌎",
        title: "Education Expenditure",
        description: "This map highlights global education spending."
    },
    {
        icon: "📚",
        title: "Performance Dashboard",
        description: "A dashboard that visualizes student performance data."
    },
    {
        icon: "📈",
        title: "Predictive Analysis",
        description: "Model performance, predictions, and feature importance."
    },
    {
        icon: "🧐",
        title: "User Reviews",
        description: "Feedback on dashboard usability and key metric clarity."
    }
];

const sectionContainer = document.getElementById("sections-container");
const rootStyles = getComputedStyle(document.documentElement);
const sectionCount = parseInt(rootStyles.getPropertyValue("--section-count"), 10);

for (let i = 1; i <= sectionCount; i++) {
    const section = sections[i - 1];

    const sectionElement = document.createElement("div");
    sectionElement.classList.add("section");
    sectionElement.setAttribute("data-index", i);

    sectionElement.innerHTML = `
      <div class="section-image">
          <span>${section.icon}</span>
      </div>
      <div class="section-text">
        <div class="section-title">${section.title}</div>
        <div class="section-description">${section.description}</div>
      </div>
    `;

    sectionElement.addEventListener("click", () => {
        const newIndex = i;
        if (currentIndex === newIndex) return;
        currentIndex = newIndex;
        updateActiveSection();
    });

    sectionContainer.appendChild(sectionElement);
}



const sectionElements = document.querySelectorAll(".section");
let currentIndex = 1; // Start at index 1

function updateActiveSection() {
    sectionElements.forEach((element, index) => {
        element.classList.toggle("active", index + 1 === currentIndex);
    });

    const rightContainer = document.querySelector('.right');
    rightContainer.innerHTML = ''; // Clear the content of the right panel before injecting new content

    let iframe;
    if (currentIndex === 1) {
        iframe = createIframe('page1.html');
        rightContainer.appendChild(iframe);
    } else if (currentIndex === 2) {
        iframe = createIframe('page2.html');
        rightContainer.appendChild(iframe);
    } else if (currentIndex === 3) {
        iframe = createIframe('page3.html');
        rightContainer.appendChild(iframe);
    } else if (currentIndex === 4) {
        iframe = createIframe('page4.html');
        rightContainer.appendChild(iframe);
    }

    iframe.onload = function () {
        adjustIframeHeight(iframe);
    };
}

// Helper function to create iframe
function createIframe(src) {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = '100%';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden'; // Ensure iframe doesn't scroll internally
    iframe.style.display = 'block'; // Ensure iframe behaves like a block element
    iframe.style.position = 'relative'; // Contain iframe within the parent
    return iframe;
}

// Adjust iframe height dynamically
function adjustIframeHeight(iframe) {
    const observer = new MutationObserver(() => {
        const contentHeight = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = contentHeight + 'px';

        // Adjust parent container height
        const rightContainer = document.querySelector('.right');
        rightContainer.style.height = contentHeight + 'px';
    });

    const iframeDocument = iframe.contentWindow.document;

    observer.observe(iframeDocument.body, { attributes: true, childList: true, subtree: true });

    // Initial height adjustment
    const initialHeight = iframeDocument.body.scrollHeight;
    iframe.style.height = initialHeight + 'px';
    document.querySelector('.right').style.height = initialHeight + 'px';
}

updateActiveSection();