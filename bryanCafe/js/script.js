document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Year in Footer
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Load Menu from XML
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
        loadMenu();
    }

    function loadMenu() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "xml/menu.xml", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    const xmlDoc = xhr.responseXML;
                    if (!xmlDoc) {
                        showMenuError();
                        return;
                    }
                    const items = xmlDoc.getElementsByTagName("item");
                    if (items.length === 0) {
                        showMenuError();
                        return;
                    }
                    
                    menuContainer.innerHTML = "";
                    
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        const name = item.getElementsByTagName("name")[0].textContent;
                        const desc = item.getElementsByTagName("description")[0].textContent;
                        const price = item.getElementsByTagName("price")[0].textContent;
                        const imgFile = item.getElementsByTagName("image")[0].textContent;
                        
                        const card = document.createElement("div");
                        card.className = "menu-card";
                        
                        const imgEl = document.createElement("img");
                        imgEl.src = "images/" + imgFile;
                        imgEl.alt = name;
                        imgEl.onerror = function() {
                            this.src = "https://placehold.co/400x300/8B5E3C/FFFFFF?text=" + encodeURIComponent(name);
                        };
                        
                        const content = document.createElement("div");
                        content.className = "menu-card-content";
                        
                        const titleEl = document.createElement("h3");
                        titleEl.textContent = name;
                        
                        const descEl = document.createElement("p");
                        descEl.className = "desc";
                        descEl.textContent = desc;
                        
                        const priceEl = document.createElement("p");
                        priceEl.className = "price";
                        priceEl.textContent = price;
                        
                        content.appendChild(titleEl);
                        content.appendChild(descEl);
                        content.appendChild(priceEl);
                        
                        card.appendChild(imgEl);
                        card.appendChild(content);
                        
                        menuContainer.appendChild(card);
                    }
                } else {
                    showMenuError();
                }
            }
        };
        xhr.send();
    }

    function showMenuError() {
        if (menuContainer) {
            menuContainer.innerHTML = '<div class="menu-error">Sorry, the menu could not be loaded at this time. Please try again later.</div>';
        }
    }

    // 3. Load Branches from XML
    const branchesContainer = document.getElementById("branches-container");
    if (branchesContainer) {
        loadBranches();
    }

    function loadBranches() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "xml/branches.xml", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
                const xmlDoc = xhr.responseXML;
                if (!xmlDoc) return;
                const branches = xmlDoc.getElementsByTagName("branch");
                
                branchesContainer.innerHTML = "";
                
                for (let i = 0; i < branches.length; i++) {
                    const b = branches[i];
                    const name = b.getElementsByTagName("name")[0].textContent;
                    const address = b.getElementsByTagName("address")[0].textContent;
                    const phone = b.getElementsByTagName("phone")[0].textContent;
                    const hours = b.getElementsByTagName("hours")[0].textContent;
                    const mapLink = b.getElementsByTagName("mapLink")[0].textContent;
                    
                    const card = document.createElement("div");
                    card.className = "branch-card";
                    
                    const title = document.createElement("h3");
                    title.textContent = name;
                    
                    const pAdd = document.createElement("p");
                    pAdd.innerHTML = "<strong>Address:</strong> " + address;
                    
                    const pPhone = document.createElement("p");
                    pPhone.innerHTML = "<strong>Phone:</strong> " + phone;
                    
                    const pHours = document.createElement("p");
                    pHours.innerHTML = "<strong>Opening Hours:</strong> " + hours;
                    
                    const link = document.createElement("a");
                    link.href = mapLink;
                    link.target = "_blank";
                    link.textContent = "View on Google Maps";
                    
                    card.appendChild(title);
                    card.appendChild(pAdd);
                    card.appendChild(pPhone);
                    card.appendChild(pHours);
                    card.appendChild(link);
                    
                    branchesContainer.appendChild(card);
                }
            }
        };
        xhr.send();
    }

    // 4. Contact Form Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (!firstName || !lastName || !email || !subject || !message) {
                alert("Please fill in all fields.");
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            
            const fb = document.getElementById("feedback-message");
            fb.textContent = "Thank you for your enquiry, " + firstName + "! We will get back to you soon.";
            fb.style.display = "block";
            
            contactForm.reset();
            
            setTimeout(() => {
                fb.style.display = "none";
            }, 5000);
        });
    }
});