// Utility Functions
function toggleTheme() {
    const body = document.body;
    const logoImg = document.querySelector('.logo img');
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    
    // Update theme toggle buttons text
    themeToggles.forEach(button => {
        button.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });
    
    // Update logo based on theme
    if (isDarkMode) {
        logoImg.src = './IMG_4570.jpg'; // Dark mode logo
    } else {
        logoImg.src = './IMG_4571.jpg'; // Light mode logo
    }
}

function changeSemester(semester, element) {
    const button = document.querySelector('.semester-button');
    const content = document.querySelector('.semester-content');
    
    button.innerHTML = semester + ' <span class="arrow">▼</span>';
    content.classList.remove('show');
    button.querySelector('.arrow').style.transform = 'rotate(0deg)';
}

function toggleTreeItem(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    content.classList.toggle('show');
    arrow.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : '';
}

// Add this function to create the Map sidebar content
function createMapSidebar() {
    return `
        <div class="sidebar-tabs">
            <a href="#" class="schedule-tab active">Schedule</a>
            <a href="#" class="floor-plan-tab">Floor Plan</a>
        </div>
        
        <div class="floor-tree" style="display: none;">
            <div class="tree-item">
                <div class="tree-header" onclick="toggleTreeItem(this)">
                    <span class="building-name">Jepson</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="tree-content">
                    <div class="tree-subitem">Lower-level</div>
                    <div class="tree-subitem">First floor</div>
                    <div class="tree-subitem">Second floor</div>
                </div>
            </div>
            <div class="tree-item">
                <div class="tree-header" onclick="toggleTreeItem(this)">
                    <span class="building-name">Herak</span>
                    <span class="arrow">▼</span>
                </div>
                <div class="tree-content"></div>
            </div>
        </div>
        
        <div class="schedule-view" style="display: block;">
            <div class="weekday-panels">
                <div class="day-panel">
                    <div class="day-header" onclick="toggleDayPanel(this)">
                        <span>Monday</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="day-content show">
                        <p>No classes this day!</p>
                    </div>
                </div>
                <div class="day-panel">
                    <div class="day-header" onclick="toggleDayPanel(this)">
                        <span>Tuesday</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="day-content">
                        <p>MATH 231 - Calculus (2)</p>
                    </div>
                </div>
                <div class="day-panel">
                    <div class="day-header" onclick="toggleDayPanel(this)">
                        <span>Wednesday</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="day-content">
                        <p>No classes this day!</p>
                    </div>
                </div>
                <div class="day-panel">
                    <div class="day-header" onclick="toggleDayPanel(this)">
                        <span>Thursday</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="day-content">
                        <p>MATH 231 - Calculus (2)</p>
                    </div>
                </div>
                <div class="day-panel">
                    <div class="day-header" onclick="toggleDayPanel(this)">
                        <span>Friday</span>
                        <span class="arrow">▼</span>
                    </div>
                    <div class="day-content">
                        <p>No classes this day!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Add this function to handle day panel toggling
function toggleDayPanel(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    content.classList.toggle('show');
    arrow.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : '';
}

// Add this function to create the context menu
function createContextMenu(x, y, eventBlock) {
    // Remove any existing context menu
    const existingMenu = document.querySelector('.context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;

    menu.innerHTML = `
        <div class="menu-item edit">Edit Event</div>
        <div class="menu-item color">Change Color</div>
        <div class="menu-item duplicate">Duplicate</div>
        <div class="menu-item delete">Delete</div>
    `;

    // Add event listeners for menu items
    menu.querySelector('.edit').addEventListener('click', () => {
        // Get current values
        const currentName = eventBlock.querySelector('.event-name').textContent;
        const currentTime = eventBlock.querySelector('.event-time').textContent;
        const [currentStart, currentEnd] = currentTime.split(' - ');

        // Create edit form HTML
        const editForm = document.createElement('div');
        editForm.className = 'edit-form';
        editForm.innerHTML = `
            <div class="form-group">
                <input type="text" id="edit-name" placeholder="Event Name" value="${currentName}">
            </div>
            <div class="form-group">
                <div class="weekday-buttons">
                    <button class="weekday-btn" data-day="T">T</button>
                    <button class="weekday-btn" data-day="W">W</button>
                    <button class="weekday-btn" data-day="R">R</button>
                    <button class="weekday-btn" data-day="F">F</button>
                    <button class="weekday-btn" data-day="M">M</button>
                </div>
            </div>
            <div class="form-group">
                <input type="time" id="edit-start" value="${currentStart}">
            </div>
            <div class="form-group">
                <input type="time" id="edit-end" value="${currentEnd}">
            </div>
            <div class="edit-buttons">
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;

        // Show edit form
        const editDialog = document.createElement('div');
        editDialog.className = 'edit-dialog';
        editDialog.appendChild(editForm);
        document.body.appendChild(editDialog);

        // Add event listeners for weekday buttons
        editForm.querySelectorAll('.weekday-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
            });
        });

        // Handle save
        editForm.querySelector('.save-btn').addEventListener('click', () => {
            const newName = editForm.querySelector('#edit-name').value;
            const newStart = editForm.querySelector('#edit-start').value;
            const newEnd = editForm.querySelector('#edit-end').value;
            const selectedDays = Array.from(editForm.querySelectorAll('.weekday-btn.selected'))
                .map(btn => btn.dataset.day);
            
            // Validate inputs
            if (!newName || !newStart || !newEnd) {
                alert('Please fill in all fields');
                return;
            }
            if (selectedDays.length === 0) {
                alert('Please select at least one day');
                return;
            }

            // Remove existing event blocks
            const cell = eventBlock.parentElement;
            cell.innerHTML = '';

            // Create new event blocks for each selected day
            selectedDays.forEach(day => {
                const dayIndex = ['M', 'T', 'W', 'R', 'F'].indexOf(day) + 1;
                const startCell = document.querySelector(`table tr:nth-child(${startHour - 8 + 2}) td:nth-child(${dayIndex + 1})`);
                
                if (startCell) {
                    addEventToSchedule(newName, [day], newStart, newEnd);
                }
            });

            editDialog.remove();
        });

        // Handle cancel
        editForm.querySelector('.cancel-btn').addEventListener('click', () => {
            editDialog.remove();
        });

        menu.remove();
    });

    menu.querySelector('.color').addEventListener('click', () => {
        // Remove any existing color picker
        const existingPicker = document.querySelector('.color-picker');
        if (existingPicker) {
            existingPicker.remove();
        }

        // Create color picker
        const colorPicker = document.createElement('div');
        colorPicker.className = 'color-picker';
        
        // Define colors
        const colors = [
            '#808080', // Gray
            '#4A90E2', // Blue
            '#B41231', // Red
            '#357ABD', // Light Blue
            '#002467', // Dark Blue
            '#2ECC71', // Green
            '#E67E22', // Orange
            '#9B59B6', // Purple
            '#E74C3C', // Bright Red
            '#1ABC9C'  // Turquoise
        ];

        // Add color options
        colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = color;
            
            colorOption.addEventListener('click', () => {
                eventBlock.style.backgroundColor = color;
                colorPicker.remove();
                menu.remove();
            });
            
            colorPicker.appendChild(colorOption);
        });

        // Position the color picker next to the context menu
        const menuRect = menu.getBoundingClientRect();
        colorPicker.style.left = `${menuRect.right + 5}px`;
        colorPicker.style.top = `${menuRect.top}px`;

        // Add to document
        document.body.appendChild(colorPicker);

        // Close color picker when clicking outside
        document.addEventListener('click', function closeColorPicker(e) {
            if (!colorPicker.contains(e.target) && !menu.contains(e.target)) {
                colorPicker.remove();
                document.removeEventListener('click', closeColorPicker);
            }
        });

        menu.remove();
    });

    menu.querySelector('.duplicate').addEventListener('click', () => {
        const clone = eventBlock.cloneNode(true);
        
        // Set a different color for the duplicate
        const colors = ['#808080', '#4A90E2', '#B41231', '#357ABD', '#002467'];
        const currentColor = eventBlock.style.backgroundColor || '#808080';
        const currentIndex = colors.indexOf(currentColor);
        const nextColor = colors[(currentIndex + 1) % colors.length];
        clone.style.backgroundColor = nextColor;
        
        // Get original event name
        const originalName = eventBlock.querySelector('.event-name').textContent;
        
        // Find existing copies and get the next number
        const cell = eventBlock.parentNode;
        const existingBlocks = cell.querySelectorAll('.event-block');
        let copyNumber = 0;
        
        existingBlocks.forEach(block => {
            const name = block.querySelector('.event-name').textContent;
            if (name.startsWith(originalName + ' copy')) {
                const match = name.match(/copy(\d+)?$/);
                if (match) {
                    const num = match[1] ? parseInt(match[1]) : 0;
                    copyNumber = Math.max(copyNumber, num + 1);
                } else {
                    copyNumber = Math.max(copyNumber, 1);
                }
            }
        });
        
        // Update only the clone's name
        clone.querySelector('.event-name').textContent = `${originalName} copy${copyNumber || ''}`;
        
        // Calculate width and position based on total number of blocks
        const totalBlocks = existingBlocks.length + 1;
        const blockWidth = 96 / totalBlocks; // 96% total width divided by number of blocks
        const gap = 2 / (totalBlocks - 1); // Distribute remaining 4% as gaps
        
        // Reposition all blocks
        existingBlocks.forEach((block, index) => {
            block.style.width = `${blockWidth}%`;
            block.style.left = `${(index * (blockWidth + gap))}%`;
        });
        
        // Position the new clone
        clone.style.width = `${blockWidth}%`;
        clone.style.left = `${((totalBlocks - 1) * (blockWidth + gap))}%`;
        
        // Keep the same height and position
        clone.style.height = eventBlock.style.height;
        clone.style.top = eventBlock.style.top;
        
        // Add event listeners to the clone
        addEventBlockListeners(clone);
        
        // Add to the same cell
        eventBlock.parentNode.appendChild(clone);
        
        menu.remove();
    });

    // Updated delete functionality
    menu.querySelector('.delete').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this event?')) {
            eventBlock.parentElement.removeChild(eventBlock);
        }
        menu.remove();
    });

    document.body.appendChild(menu);

    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
}

// Add this function to handle event block listeners
function addEventBlockListeners(eventBlock) {
    eventBlock.addEventListener('dblclick', (e) => {
        e.preventDefault();
        e.stopPropagation();
        createContextMenu(e.pageX, e.pageY, eventBlock);
    });
}

// Update the addEventToSchedule function
function addEventToSchedule(eventName, days, startTime, endTime) {
    // Convert times to hour and minute numbers
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Get all selected days
    const selectedDays = [];
    document.querySelectorAll('.weekday-btn.selected').forEach(btn => {
        const day = btn.textContent;
        const dayIndex = ['M', 'T', 'W', 'R', 'F'].indexOf(day) + 1;
        selectedDays.push(dayIndex);
    });

    // Create event blocks for each selected day
    selectedDays.forEach(dayIndex => {
        // Find the start cell
        const startRowIndex = startHour - 8 + 2; // +2 to account for header row and 8AM start
        const startCell = document.querySelector(`table tr:nth-child(${startRowIndex}) td:nth-child(${dayIndex + 1})`);
        
        if (startCell) {
            const eventBlock = document.createElement('div');
            eventBlock.className = 'event-block';
            
            // Calculate position and height based on exact times
            const startMinuteOffset = (startMinute / 60) * 60; // Convert minutes to pixels
            const endMinuteOffset = (endMinute / 60) * 60;
            const duration = ((endHour - startHour) * 60) + (endMinute - startMinute);
            
            // Set the block's style with precise positioning
            eventBlock.style.top = `${startMinuteOffset}px`;
            eventBlock.style.height = `${duration}px`;
            eventBlock.style.zIndex = '1';
            
            // Create the event content with name and time
            eventBlock.innerHTML = `
                <div class="event-name">${eventName}</div>
                <div class="event-time">${startTime} - ${endTime}</div>
            `;
            
            // Add event listeners to the new block
            addEventBlockListeners(eventBlock);

            startCell.style.position = 'relative';
            startCell.appendChild(eventBlock);
        }
    });
}

// Update the createRecurringEventsContent function to remove the export button
function createRecurringEventsContent() {
    return `
        <div class="recurring-events-view">
            <div class="form-group">
                <input type="text" placeholder="Event Name" id="eventNameInput">
            </div>
            
            <div class="form-group">
                <div class="weekday-buttons">
                    <button class="weekday-btn">M</button>
                    <button class="weekday-btn">T</button>
                    <button class="weekday-btn">W</button>
                    <button class="weekday-btn">R</button>
                    <button class="weekday-btn">F</button>
                </div>
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="Start Time --:--" class="time-input" id="start-time" maxlength="5">
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="End Time --:--" class="time-input" id="end-time" maxlength="5">
            </div>
            
            <button class="add-event-btn">Add</button>
        </div>
    `;
}

// Update the subjects array at the top of the file
const subjects = [
    'Accounting',
    'Art',
    'Business',
    'Chemistry',
    'Communication',
    'Communication Leadership',
    'Computer Science',
    'Counselor Education',
    'Criminology',
    'Critical Race & Ethnic Studies',
    'Doctoral Prg in Leadership Studies',
    'Economics',
    'Engineering Science',
    'English',
    'English Language Center',
    'Environmental Studies & Science',
    'Finance',
    'French',
    'German',
    'Health Equity',
    'History',
    'Human Physiology',
    'Integrated Media',
    'International Studies',
    'Italian',
    'Journalism',
    'Management',
    'Management Information Systems',
    'Marketing',
    'Masters Accounting',
    'Masters Business Administration',
    'Masters Business Analytics',
    'Mathematics',
    'Military Science',
    'Modern Language',
    'Music',
    'Native American Studies',
    'Nurse Anesthesia Practice',
    'Nursing Organizational Leadership',
    'Philosophy',
    'Physical Education',
    'Political Science',
    'Psychology',
    'Religious Studies',
    'Sociology',
    'Solidarity & Social Justice',
    'Spanish',
    'Special Education',
    'Teacher Education',
    'Teaching English as Second Language',
    'Transmission & Distribution',
    'Womens and Gender Studies'
];

// Add the attributes array at the top of the file
const attributes = [
    'Activity',
    'Additional Lab Fee Required',
    'BU Experiential Credits',
    'BU International Credits',
    'CATH - Catholic Studies Elective',
    'CENG - Tech Elective',
    'Climate/Sustainable/Environmental Justice',
    'Community Engaged Learning',
    'Core: Christian or Catholic',
    'Core: Communication and Speech',
    'Core: Core Integration Seminar',
    'Core: Ethics',
    'Core: Fine Arts and Design',
    'Core: First Year Seminar',
    'Core: Global Studies',
    'Core: History',
    'Core: Literature',
    'Core: Mathematics',
    'Core: Philosophy of Human Nature',
    'Core: Reasoning',
    'Core: Science Inquiry',
    'Core: Social Justice',
    'Core: Social/Behavioral Science',
    'Core: World or Comparative Religion',
    'Core: Writing',
    'Core: Writing Enriched',
    'CPEN - Tech Elective',
    'EENG - Tech Elective',
    'ENGL - American Lit Post-1900',
    'ENGL - American Lit Pre-1900',
    'ENGL - British Lit 1660-1914',
    'ENGL - British Lit Post-1660',
    'ENGL - British Lit Pre-1660',
    'ENGL - British/American Lit',
    'ENGL - Literature Post-1914',
    'ENGL - Literature Pre-1660',
    'ENGL - Multicultural Distribution',
    'ENGL - Writing',
    'ENVS - Science Tech Elective',
    'ENVS - Studies Elective',
    'FILM - Film Elective',
    'HEAL - Electives',
    'HEAL - Experiential',
    'HIST - Modern Europe',
    'HIST - Non-West/Dev Area',
    'HIST - Pre-Modern Europe',
    'HIST - U.S. History',
    'Immersive Outdoor Learning',
    'INST - Africa Region Content',
    'INST - Asian Region Content',
    'INST - Asian Studies Content',
    'INST - Difference',
    'INST - Europe Region Content',
    'INST - European Studies',
    'INST - Glbl/Incl Theme Content',
    'INST - Interactions',
    'INST - Latin Am Region Content',
    'INST - Latin American Studies',
    'INST - Mid East Region Content',
    'INST - Pol Econ Theme Content',
    'INST - War/Peace Theme Content',
    'ITAL - Studies Upper Division Elective',
    'MENG - Tech Elective',
    'On-line/Internet Course',
    'PHIL - Contemporary',
    'PHIL - Ethics or Political',
    'Science Class - Non-Science Majors',
    'SOSJ - Block A',
    'SOSJ - Block B',
    'SOSJ - Block C',
    'SOSJ - Block D',
    'Transportation Not Provided',
    'Undergraduate Core'
];

// Add the campuses array at the top of the file
const campuses = [
    'Florence',
    'Main',
    'Off-Campus/Cohort Programs',
    'Online Graduate Nursing',
    'Professional Studies Abroad'
];

// Add the instructional methods array at the top of the file
const instructionalMethods = [
    'Classroom Face-to-Face Only',
    'Hybrid Synchronous and Zoom',
    'On-Line Asynchronous Only',
    'Remote Synchronous Zoom'
];

// Update the form group for Subject in createRegistrationSidebar
function createRegistrationSidebar() {
    return `
        <div class="sidebar-tabs">
            <a href="#" class="courses-tab active">Courses</a>
            <a href="#" class="recurring-events-tab">Recurring Events</a>
            <a href="#" class="prereq-tree-tab">Pre-Req Tree</a>
        </div>
        
        <div class="courses-view">
            <div class="form-group">
                <input type="text" placeholder="Subject" id="subjectInput" autocomplete="off">
                <div class="autocomplete-list" id="subjectList"></div>
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="Course code">
            </div>
            
            <div class="form-group">
                <div class="level-buttons">
                    <button class="division-btn" id="lower-division">Lower Division</button>
                    <button class="division-btn" id="upper-division">Upper Division</button>
                </div>
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="Attributes" id="attributeInput" autocomplete="off">
                <div class="autocomplete-list" id="attributeList"></div>
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="Instructor">
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="Campus" id="campusInput" autocomplete="off">
                <div class="autocomplete-list" id="campusList"></div>
            </div>
            
            <div class="form-group">
                <input type="text" placeholder="Instructional Methods" id="methodsInput" autocomplete="off">
                <div class="autocomplete-list" id="methodsList"></div>
            </div>
        </div>

        <div class="recurring-events-view" style="display: none;">
            ${createRecurringEventsContent()}
        </div>

        <div class="prereq-tree-view" style="display: none;">
            ${createPreReqTreeContent()}
        </div>
    `;
}

// Add this function to create the Pre-Req Tree content
function createPreReqTreeContent() {
    return `
        <div class="prereq-tree-container">
            <!-- Pre-req tree content will go here -->
            <div class="coming-soon">
                Pre-Requisite Tree View Coming Soon
            </div>
        </div>
    `;
}

// Modify the registration click handler to include tab switching functionality
function initializeRegistrationSidebar() {
    const coursesTab = document.querySelector('.courses-tab');
    const recurringEventsTab = document.querySelector('.recurring-events-tab');
    const prereqTreeTab = document.querySelector('.prereq-tree-tab');
    const coursesView = document.querySelector('.courses-view');
    const recurringEventsView = document.querySelector('.recurring-events-view');
    const prereqTreeView = document.querySelector('.prereq-tree-view');
    
    // Tab switching
    if (recurringEventsTab) {
        recurringEventsTab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            coursesTab.classList.remove('active');
            prereqTreeTab.classList.remove('active');
            
            // Add active class to recurring events tab
            recurringEventsTab.classList.add('active');
            
            // Show/hide views
            coursesView.style.display = 'none';
            recurringEventsView.style.display = 'block';
            prereqTreeView.style.display = 'none';
        });
    }

    if (coursesTab) {
        coursesTab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            recurringEventsTab.classList.remove('active');
            prereqTreeTab.classList.remove('active');
            
            // Add active class to courses tab
            coursesTab.classList.add('active');
            
            // Show/hide views
            coursesView.style.display = 'block';
            recurringEventsView.style.display = 'none';
            prereqTreeView.style.display = 'none';
        });
    }

    if (prereqTreeTab) {
        prereqTreeTab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            coursesTab.classList.remove('active');
            recurringEventsTab.classList.remove('active');
            
            // Add active class to pre-req tree tab
            prereqTreeTab.classList.add('active');
            
            // Show/hide views
            coursesView.style.display = 'none';
            recurringEventsView.style.display = 'none';
            prereqTreeView.style.display = 'block';
        });
    }

    // Initialize division buttons
    const divisionBtns = document.querySelectorAll('.division-btn');
    divisionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                this.style.cssText = `
                    border: 1px solid #C4C8CE;
                    color: #6c757d;
                    background-color: transparent;
                `;
            } else {
                divisionBtns.forEach(otherBtn => {
                    otherBtn.classList.remove('selected');
                    otherBtn.style.cssText = `
                        border: 1px solid #C4C8CE;
                        color: #6c757d;
                        background-color: transparent;
                    `;
                });
                this.classList.add('selected');
                this.style.cssText = `
                    border: 1px solid #002467;
                    color: #ffffff;
                    background-color: #002467;
                `;
            }
        });
    });

    // Campus dropdown functionality
    const campusDropdown = document.querySelector('.campus-dropdown');
    if (campusDropdown) {
        const dropdownButton = campusDropdown.querySelector('.dropdown-button');
        const dropdownList = campusDropdown.querySelector('.dropdown-list');
        const dropdownItems = campusDropdown.querySelectorAll('.dropdown-item');

        dropdownButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdownList.classList.toggle('show');
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = dropdownList.classList.contains('show') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedText = this.textContent;
                dropdownButton.innerHTML = selectedText + ' <span class="arrow">▼</span>';
                dropdownList.classList.remove('show');
                dropdownButton.querySelector('.arrow').style.transform = 'rotate(0deg)';
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!campusDropdown.contains(e.target)) {
                dropdownList.classList.remove('show');
                const arrow = dropdownButton.querySelector('.arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Weekday button functionality
    const weekdayBtns = document.querySelectorAll('.weekday-btn');
    weekdayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // Time input formatting
    const timeInputs = document.querySelectorAll('.time-input');
    timeInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            if (value.length >= 2) {
                // Insert colon after the first two digits
                value = value.slice(0, 2) + ':' + value.slice(2);
            }
            
            // Validate hours and minutes
            const parts = value.split(':');
            if (parts[0] && parseInt(parts[0]) > 23) {
                parts[0] = '23';
            }
            if (parts[1] && parseInt(parts[1]) > 59) {
                parts[1] = '59';
            }
            
            // Update the input value
            if (parts.length === 2) {
                e.target.value = parts.join(':');
            } else {
                e.target.value = value;
            }
        });

        // Add blur event to format incomplete times
        input.addEventListener('blur', function(e) {
            let value = e.target.value;
            if (value) {
                const parts = value.split(':');
                if (parts[0] && parts[0].length === 1) parts[0] = '0' + parts[0];
                if (parts[1] && parts[1].length === 1) parts[1] = '0' + parts[1];
                if (!parts[1]) parts[1] = '00';
                e.target.value = parts.join(':');
            }
        });
    });

    // Subject autocomplete
    const subjectInput = document.getElementById('subjectInput');
    const subjectList = document.getElementById('subjectList');

    if (subjectInput && subjectList) {
        subjectInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const matches = subjects.filter(subject => 
                subject.toLowerCase().includes(value)
            );

            if (value && matches.length > 0) {
                subjectList.innerHTML = matches
                    .map(subject => `<div class="autocomplete-item">${subject}</div>`)
                    .join('');
                subjectList.style.display = 'block';
            } else {
                subjectList.style.display = 'none';
            }
        });

        // Handle click on autocomplete item
        subjectList.addEventListener('click', function(e) {
            if (e.target.classList.contains('autocomplete-item')) {
                subjectInput.value = e.target.textContent;
                subjectList.style.display = 'none';
            }
        });

        // Close autocomplete list when clicking outside
        document.addEventListener('click', function(e) {
            if (!subjectInput.contains(e.target) && !subjectList.contains(e.target)) {
                subjectList.style.display = 'none';
            }
        });
    }

    // Attributes autocomplete
    const attributeInput = document.getElementById('attributeInput');
    const attributeList = document.getElementById('attributeList');

    if (attributeInput && attributeList) {
        attributeInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const matches = attributes.filter(attribute => 
                attribute.toLowerCase().includes(value)
            );

            if (value && matches.length > 0) {
                attributeList.innerHTML = matches
                    .map(attribute => `<div class="autocomplete-item">${attribute}</div>`)
                    .join('');
                attributeList.style.display = 'block';
            } else {
                attributeList.style.display = 'none';
            }
        });

        // Handle click on autocomplete item
        attributeList.addEventListener('click', function(e) {
            if (e.target.classList.contains('autocomplete-item')) {
                attributeInput.value = e.target.textContent;
                attributeList.style.display = 'none';
            }
        });

        // Close autocomplete list when clicking outside
        document.addEventListener('click', function(e) {
            if (!attributeInput.contains(e.target) && !attributeList.contains(e.target)) {
                attributeList.style.display = 'none';
            }
        });
    }

    // Campus autocomplete
    const campusInput = document.getElementById('campusInput');
    const campusList = document.getElementById('campusList');

    if (campusInput && campusList) {
        campusInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const matches = campuses.filter(campus => 
                campus.toLowerCase().includes(value)
            );

            if (value && matches.length > 0) {
                campusList.innerHTML = matches
                    .map(campus => `<div class="autocomplete-item">${campus}</div>`)
                    .join('');
                campusList.style.display = 'block';
            } else {
                campusList.style.display = 'none';
            }
        });

        // Handle click on autocomplete item
        campusList.addEventListener('click', function(e) {
            if (e.target.classList.contains('autocomplete-item')) {
                campusInput.value = e.target.textContent;
                campusList.style.display = 'none';
            }
        });

        // Close autocomplete list when clicking outside
        document.addEventListener('click', function(e) {
            if (!campusInput.contains(e.target) && !campusList.contains(e.target)) {
                campusList.style.display = 'none';
            }
        });
    }

    // Instructional Methods autocomplete
    const methodsInput = document.getElementById('methodsInput');
    const methodsList = document.getElementById('methodsList');

    if (methodsInput && methodsList) {
        methodsInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const matches = instructionalMethods.filter(method => 
                method.toLowerCase().includes(value)
            );

            if (value && matches.length > 0) {
                methodsList.innerHTML = matches
                    .map(method => `<div class="autocomplete-item">${method}</div>`)
                    .join('');
                methodsList.style.display = 'block';
            } else {
                methodsList.style.display = 'none';
            }
        });

        // Handle click on autocomplete item
        methodsList.addEventListener('click', function(e) {
            if (e.target.classList.contains('autocomplete-item')) {
                methodsInput.value = e.target.textContent;
                methodsList.style.display = 'none';
            }
        });

        // Close autocomplete list when clicking outside
        document.addEventListener('click', function(e) {
            if (!methodsInput.contains(e.target) && !methodsList.contains(e.target)) {
                methodsList.style.display = 'none';
            }
        });
    }

    // Add event button functionality
    const addEventBtn = document.querySelector('.add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            const eventName = document.getElementById('eventNameInput').value;
            const startTime = document.getElementById('start-time').value;
            const endTime = document.getElementById('end-time').value;
            
            // Basic validation
            if (!eventName) {
                alert('Please enter an event name');
                return;
            }
            if (!startTime || !endTime) {
                alert('Please enter both start and end times');
                return;
            }
            if (!document.querySelector('.weekday-btn.selected')) {
                alert('Please select at least one day');
                return;
            }

            // Validate time format
            const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
                alert('Please enter valid times in HH:MM format');
                return;
            }

            // Add event to schedule
            addEventToSchedule(eventName, null, startTime, endTime);
            
            // Clear inputs after successful addition
            document.getElementById('eventNameInput').value = '';
            document.getElementById('start-time').value = '';
            document.getElementById('end-time').value = '';
            document.querySelectorAll('.weekday-btn.selected').forEach(btn => {
                btn.classList.remove('selected');
            });
        });
    }

    // Export Dropdown
    const exportContainer = document.querySelector('.export-container');
    const exportButton = exportContainer.querySelector('.export-button');
    
    if (exportButton) {
        // Add the dropdown content after the button
        exportContainer.insertAdjacentHTML('beforeend', createExportDropdown());
        
        const exportDropdown = exportContainer.querySelector('.export-dropdown');
        
        // Toggle dropdown on button click
        exportButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close user dropdown if open
            const userDropdown = document.querySelector('.user-dropdown .dropdown-content');
            if (userDropdown) {
                userDropdown.classList.remove('show');
            }
            
            exportDropdown.classList.toggle('show');
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = exportDropdown.classList.contains('show') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });

        // Handle export actions
        const exportCalendar = exportContainer.querySelector('.export-calendar');
        const exportPDF = exportContainer.querySelector('.export-pdf');

        exportCalendar.addEventListener('click', function(e) {
            e.preventDefault();
            exportToCalendar(); // Call the export function
            exportDropdown.classList.remove('show');
            exportButton.querySelector('.arrow').style.transform = 'rotate(0deg)';
        });

        exportPDF.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Exporting as PDF...');
            exportDropdown.classList.remove('show');
            exportButton.querySelector('.arrow').style.transform = 'rotate(0deg)';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!exportContainer.contains(e.target)) {
                exportDropdown.classList.remove('show');
                exportButton.querySelector('.arrow').style.transform = 'rotate(0deg)';
            }
        });
    }
}

// Update the createExportDropdown function
function createExportDropdown() {
    return `
        <div class="export-dropdown">
            <a href="#" class="export-calendar">Export to Calendar</a>
            <a href="#" class="export-pdf">Export as PDF</a>
        </div>
    `;
}

// Update the semester dropdown content
function createSemesterDropdown() {
    return `
        <div class="semester-content">
            <a href="#">Summer 2025</a>
            <a href="#">Spring 2025</a>
            <a href="#">Fall 2024</a>
            <a href="#">Summer 2024</a>
            <a href="#">Spring 2024</a>
            <a href="#">Fall 2023</a>
            <a href="#">Summer 2023</a>
            <a href="#">Spring 2023</a>
        </div>
    `;
}

// Add the exportToCalendar function if it doesn't exist
function exportToCalendar() {
    // Current timestamp for DTSTAMP
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Start the calendar content
    let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Gonzaga University//Class Schedule//EN'
    ].join('\r\n');

    // Add each event
    document.querySelectorAll('.event-block').forEach(eventBlock => {
        const eventName = eventBlock.querySelector('.event-name').textContent;
        const [startTime, endTime] = eventBlock.querySelector('.event-time').textContent.split(' - ');
        
        // Convert times to UTC format
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTime.split(':');
        
        // Use next Monday as the start date
        const nextMonday = getNextMonday();
        const dtStart = formatDateForICS(nextMonday, startHour, startMinute);
        const dtEnd = formatDateForICS(nextMonday, endHour, endMinute);

        // Create RRULE based on selected days
        const selectedDays = ['MO', 'TU', 'WE', 'TH', 'FR'];
        const rrule = `RRULE:FREQ=WEEKLY;BYDAY=${selectedDays.join(',')};UNTIL=20251231T235959Z`;

        // Add event to calendar
        icsContent += '\r\n' + [
            'BEGIN:VEVENT',
            'UID:' + Date.now() + '@gonzaga.edu',
            'DTSTAMP:' + now,
            'SUMMARY:' + eventName,
            'DTSTART:' + dtStart,
            'DTEND:' + dtEnd,
            rrule,
            'END:VEVENT'
        ].join('\r\n');
    });

    // Close the calendar
    icsContent += '\r\nEND:VCALENDAR';

    // Create and trigger download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'class_schedule.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Helper functions
function getNextMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? 1 : 8 - day;
    return new Date(today.setDate(today.getDate() + diff));
}

function formatDateForICS(date, hours, minutes) {
    return date.getFullYear() +
           String(date.getMonth() + 1).padStart(2, '0') +
           String(date.getDate()).padStart(2, '0') + 'T' +
           String(hours).padStart(2, '0') +
           String(minutes).padStart(2, '0') + '00';
}

// Main Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Semester Dropdown
    const semesterButton = document.querySelector('.semester-button');
    const semesterContent = document.querySelector('.semester-content');
    
    if (semesterButton && semesterContent) {
        // Toggle dropdown on button click
        semesterButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns if open
            const exportDropdown = document.querySelector('.export-dropdown');
            const userDropdown = document.querySelector('.user-dropdown .dropdown-content');
            if (exportDropdown) exportDropdown.classList.remove('show');
            if (userDropdown) userDropdown.classList.remove('show');
            
            semesterContent.classList.toggle('show');
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = semesterContent.classList.contains('show') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!semesterButton.contains(e.target) && !semesterContent.contains(e.target)) {
                semesterContent.classList.remove('show');
                const arrow = semesterButton.querySelector('.arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Update semester text and close dropdown when option is selected
        semesterContent.querySelectorAll('a').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedText = this.textContent;
                semesterButton.innerHTML = selectedText + ' <span class="arrow">▼</span>';
                semesterContent.classList.remove('show');
                semesterButton.querySelector('.arrow').style.transform = 'rotate(0deg)';
            });
        });
    }

    // Sidebar Tabs
    const sidebarTabs = document.querySelectorAll('.sidebar-tabs a');
    sidebarTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
        });
    });

    // Division Buttons
    const divisionBtns = document.querySelectorAll('.division-btn');
    divisionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                this.style.cssText = `
                    border: 1px solid #C4C8CE;
                    color: #6c757d;
                    background-color: transparent;
                `;
            } else {
                divisionBtns.forEach(otherBtn => {
                    otherBtn.classList.remove('selected');
                    otherBtn.style.cssText = `
                        border: 1px solid #C4C8CE;
                        color: #6c757d;
                        background-color: transparent;
                    `;
                });
                this.classList.add('selected');
                this.style.cssText = `
                    border: 1px solid #002467;
                    color: #ffffff;
                    background-color: #002467;
                `;
            }
        });
    });

    // User Dropdown
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        const dropdownButton = document.querySelector('.user-dropdown .nav-button');

        // Toggle dropdown on button click
        dropdownButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close export dropdown if open
            const exportDropdown = document.querySelector('.export-dropdown');
            if (exportDropdown) {
                exportDropdown.classList.remove('show');
            }
            
            userDropdown.classList.toggle('show');
            const arrow = this.querySelector('.arrow');
            if (arrow) {
                arrow.style.transform = userDropdown.classList.contains('show') 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userDropdown.contains(e.target) && 
                !e.target.matches('.user-dropdown .nav-button')) {
                userDropdown.classList.remove('show');
                const arrow = dropdownButton.querySelector('.arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    }

    // Set initial states
    const registrationLink = document.querySelector('.nav-links a[href="#registration"]');
    const mapLink = document.querySelector('.nav-links a[href="#map"]');
    const sidebar = document.querySelector('.sidebar');

    // Initialize registration view
    if (registrationLink) {
        registrationLink.classList.add('active');
        sidebar.innerHTML = createRegistrationSidebar();
        initializeRegistrationSidebar();
    }

    // Update Registration navigation handler
    registrationLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Always recreate the registration sidebar
        sidebar.innerHTML = createRegistrationSidebar();
        initializeRegistrationSidebar();
    });

    // Update Map navigation handler
    mapLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Update sidebar with map view
        sidebar.innerHTML = createMapSidebar();
        
        // Add tab switching functionality
        const floorPlanTab = document.querySelector('.floor-plan-tab');
        const scheduleTab = document.querySelector('.schedule-tab');
        const floorTree = document.querySelector('.floor-tree');
        const scheduleView = document.querySelector('.schedule-view');
        
        floorPlanTab.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('active');
            scheduleTab.classList.remove('active');
            floorTree.style.display = 'block';
            scheduleView.style.display = 'none';
        });
        
        scheduleTab.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('active');
            floorPlanTab.classList.remove('active');
            floorTree.style.display = 'none';
            scheduleView.style.display = 'block';
        });
    });

    // Update the semester button to show Spring 2025 by default
    document.querySelector('.semester-button').innerHTML = 'Spring 2025 <span class="arrow">▼</span>';
});