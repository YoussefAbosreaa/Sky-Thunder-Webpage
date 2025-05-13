document.addEventListener("DOMContentLoaded", () => {
  // Dynamic team data with achievements (each member has its own achievements)
  const teamData = {
    electrical: {
      leaders: [
        {
          name: "Mohannad Zaki",
          title: "Team Leader",
          image: "assets/profiles/honda.jpg",
          achievements: [
            "3 Years of experience",
            "Developed innovative control systems",
            "Published research on autonomous navigation"
          ],
          members: [
            {
              name: "Ahmed Wael",
              title: "Communication",
              image: "assets/profiles/wael.jpg",
              achievements: [
                "3 Years of experience",
                "Designed high-reliability communication system",
                "Implemented redundant backup systems"
              ],
              members: [
                {
                  name: "Mohannad Mostafa",
                  title: "Communication",
                  image: "assets/profiles/mohannadcp.jpg",
                  achievements: [
                    "2 Years of experience",
                    "Enhanced data transmission security"
                  ]
                },
                {
                  name: "Ahmed Khaled",
                  title: "Communication",
                  image: "assets/profiles/ahmed_khaled.jpg",
                  achievements: [
                    "2 Years of experience",
                    "Enhanced data transmission security"
                  ]
                }
              ],
            },
            {
              name: "Yehia Tarek",
              title: "Wiring & Control",
              image: "assets/profiles/yehia.jpg",
              achievements: [
                "4 Years of experience",
                "Reduced system weight by 25%"
              ],
              members: [
                {
                  name: "Ibrahim Hassan",
                  title: "Control & Wiring",
                  image: "assets/profiles/she7ry.jpg",
                  achievements: [
                    "3 Years of experience",
                    "Improved power efficiency by 30%",
                    "Created wiring documentation system"
                  ]
                },
                {
                  name: "Ahmed Sherbeny",
                  title: "Control & Wiring",
                  image: "assets/profiles/sherbeny.jpg",
                  achievements: [
                    "2 Years of experience",
                    "Reduced system response time",
                    "Enhanced stability control"
                  ]
                }
              ]
            },
          ]
        },
        
      ]
    },
    mechanical: {
      leaders: [
        {
          name: "Mahmoud Saleh",
          title: "Design & Manufacturing",
          image: "assets/profiles/saleh.jpg",
          achievements: [
            "4 Years of experience",
            "Led structural design innovations",
            "Improved aerodynamic efficiency"
          ],
          members: [
            {
              name: "Mohammed Emad",
              title: "Sizing & Calculations",
              image: "assets/profiles/moemad.jpg",
              achievements: [
                "3 Years of experience",
                "Performed structural analysis"
              ],
              members: [
                {
                  name: "Mohammed Eid",
                  title: "Mechanics",
                  image: "assets/profiles/eiid.jpg",
                  achievements: [
                    "2 Years of experience",
                    "Improved assembly processes"
                  ]
                },
                {
                  name: "Mahmoud GadAllah",
                  title: "Mechanics",
                  image: "assets/profiles/gadalla.jpg",
                  achievements: [
                    "2 Years of experience",
                    "Enhanced structural integrity",
                    "Developed safety features"
                  ]
                }
              ]
            },
            {
              name: "Hussien Abdelnasser",
              title: "Mechanics",
              image: "assets/profiles/husayn.jpg",
              achievements: [
                "4 Years of experience",
                "Improved build quality",
                "Developed quality control"
              ],
              members: [
                {
                  name: "Ahmed Khaled",
                  title: "Mechanics",
                  image: "assets/profiles/harf2.jpg",
                  achievements: [
                    "3 Years of experience",
                    "Led manufacturing process"
                  ]
                },
                {
                  name: "Nour Mohammed",
                  title: "Mechanics",
                  image: "assets/profiles/noor.jpg",
                  achievements: [
                    "2 Years of experience",
                    "Enhanced safety measures"
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    media: {
      leaders: [
        {
          name: "Mohamed Yasser",
          title: "Image Processing & Documentation",
          image: "assets/profiles/talkhan.jpg",
          achievements: [
            "4 Years of experience",
            "Led documentation initiatives",
            "Developed media strategy"
          ]
        },
        {
              name: "Youssef Abosreaa",
              title: "Website",
              image: "assets/profiles/sor3a.jpg",
              achievements: [
                "Developed team website",
                "Shot FRR video"
              ]
            }
      ]
    },
    ground: {
      leaders: [
        {
          name: "Marwan Hanafy",
          title: "Ground Control Station",
          image: "assets/profiles/marwan.jpg",
          achievements: [
            "4 Years of experience",
            "Implemented mission planning interface",
            "Safety Pilot"
          ],
          members: [
            {
              name: "Adham Yasser",
              title: "Ground Control Station",
              image: "assets/profiles/adham.jpg",
              achievements: [
                "3 Years of experience",
                "Developed mission simulation tools"
              ]
            },
            {
              name: "Omar Alaa",
              title: "Ground Control Station",
              image: "assets/profiles/omaralaa.jpg",
              achievements: [
                "2 Years of experience",
                "Enhanced mission control features"
              ]
            },
            {
              name: "Abdallah Hassan",
              title: "Ground Control Station",
              image: "assets/profiles/galal.jpg",
              achievements: [
                "2 Years of experience",
                "Enhanced mission control features"
              ]
            },
            {
              name: "Youssef El-Sossy",
              title: "Ground Control Station",
              image: "assets/profiles/sossy.jpg",
              achievements: [
                "Created backup control interfaces"
              ]
            }
          ]
        },
        {
          name: "Ahmed Abdo",
          title: "ODLC & Mapping",
          image: "assets/profiles/habbal.jpg",
          achievements: [
            "Led object detection system development",
            "Improved mapping accuracy by 50%",
            "Implemented AI-based recognition"
          ],
          members: [
            {
              name: "Ahmed Aly",
              title: "Mapping",
              image: "assets/profiles/s3ody.jpg",
              achievements: [
                "Enhanced terrain recognition"
              ]
            },
            {
              name: "Sief-Eldeen Sameh",
              title: "Mapping",
              image: "assets/profiles/siefsameh.jpg",
              achievements: [
                "2 Years of experience",
                "Improved mapping resolution",
                "Created obstacle avoidance system"
              ]
            }
          ]
        }
      ]
    }
  };

  let activeNode = null;
  let activePopup = null;
  let touchStartX = 0;
  let touchStartY = 0;

  function updatePopupPosition() {
    if (activeNode && activePopup) {
      if (window.innerWidth <= 768) {
        activePopup.style.left = '50%';
        activePopup.style.top = '50%';
      } else {
        const rect = activeNode.getBoundingClientRect();
        activePopup.style.left = `${rect.right + 20}px`;
        activePopup.style.top = `${rect.top + rect.height / 2}px`;
        activePopup.style.transform = "translateY(-50%)";
      }
    }
  }

  // Team selector touch controls
  const teamSelector = document.querySelector('.team-selector');
  let startX;
  let scrollLeft;

  teamSelector.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - teamSelector.offsetLeft;
    scrollLeft = teamSelector.scrollLeft;
  });

  teamSelector.addEventListener('touchmove', (e) => {
    if (!startX) return;
    e.preventDefault();
    const x = e.touches[0].pageX - teamSelector.offsetLeft;
    const walk = (x - startX) * 2;
    teamSelector.scrollLeft = scrollLeft - walk;
  });

  function createTeamMemberNode(member) {
    const node = document.createElement("div");
    node.className = "hierarchy-node";
    node.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.title}</p>
    `;
  
    const popup = document.createElement("div");
    popup.className = "member-popup";
    popup.innerHTML = `
      <h4>Achievements</h4>
      <div class="achievements">
        ${
          member.achievements
            ? member.achievements.map(ach => `<p>• ${ach}</p>`).join('')
            : '<p>No achievements listed</p>'
        }
      </div>
    `;
    document.body.appendChild(popup);
  
    let hoverTimer;
    node.addEventListener("mouseenter", () => {
      hoverTimer = setTimeout(() => {
        if (activePopup) activePopup.classList.remove("show");
        activeNode = node;
        activePopup = popup;
        updatePopupPosition();
        popup.classList.add("show");
      }, 300);
    });
    node.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      popup.classList.remove("show");
      activeNode = null;
      activePopup = null;
    });
  
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activePopup) activePopup.classList.remove("show");
      activeNode = node;
      activePopup = popup;
      updatePopupPosition();
      popup.classList.add("show");
    });
  
    return node;
  }
  
  document.body.addEventListener("click", () => {
    if (activePopup) {
      activePopup.classList.remove("show");
      activeNode = null;
      activePopup = null;
    }
  });

  function createMemberLevels(members, container) {
    if (!members || members.length === 0) return;
    const membersLevel = document.createElement("div");
    membersLevel.className = "hierarchy-level";
    
    members.forEach(member => {
      const memberNode = createTeamMemberNode(member);
      membersLevel.appendChild(memberNode);
      
      if (member.members && member.members.length > 0) {
        const connector = document.createElement("div");
        connector.className = "hierarchy-connector";
        memberNode.appendChild(connector);
        
        const subMembersLevel = document.createElement("div");
        subMembersLevel.className = "hierarchy-level";
        member.members.forEach(subMember => {
          const subMemberNode = createTeamMemberNode(subMember);
          subMembersLevel.appendChild(subMemberNode);
        });
        memberNode.appendChild(subMembersLevel);
      }
    });
    
    container.appendChild(membersLevel);
  }

  function createHierarchyTree(teamType) {
    const team = teamData[teamType];
    if (!team) return;
    
    const hierarchyContainer = document.createElement("div");
    hierarchyContainer.className = "hierarchy-tree";
    
    const mediaContainer = document.createElement("div");
    mediaContainer.style.display = "flex";
    mediaContainer.style.gap = "2rem";
    
    team.leaders.forEach(leader => {
      const leaderColumn = document.createElement("div");
      leaderColumn.className = "leader-column";
      leaderColumn.style.display = "flex";
      leaderColumn.style.flexDirection = "column";
      leaderColumn.style.alignItems = "center";
      
      const leaderNode = createTeamMemberNode(leader);
      leaderColumn.appendChild(leaderNode);
      
      const connector = document.createElement("div");
      connector.className = "hierarchy-connector";
      leaderColumn.appendChild(connector);
      
      if (leader.members && leader.members.length > 0) {
        createMemberLevels(leader.members, leaderColumn);
      }
      
      mediaContainer.appendChild(leaderColumn);
    });
    
    hierarchyContainer.appendChild(mediaContainer);
    return hierarchyContainer;
  }
  
  document.querySelectorAll('input[name="team"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      const teamHierarchy = document.getElementById("teamHierarchy");
      teamHierarchy.innerHTML = "";
      const tree = createHierarchyTree(e.target.value);
      if (tree) {
        teamHierarchy.appendChild(tree);
      }
    });
  });
  
  const electricalRadio = document.getElementById('electrical');
  electricalRadio.checked = true;
  electricalRadio.dispatchEvent(new Event('change'));
  
  const teamHierarchy = document.getElementById("teamHierarchy");
  let isDragging = false;
  let startScrollLeft, startScrollTop;
  let scale = 1;

  teamHierarchy.addEventListener('touchstart', (e) => {
    isDragging = true;
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
    startScrollLeft = teamHierarchy.scrollLeft;
    startScrollTop = teamHierarchy.scrollTop;
  });

  teamHierarchy.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touchX = e.touches[0].pageX;
    const touchY = e.touches[0].pageY;
    const walkX = (touchStartX - touchX) * 2;
    const walkY = (touchStartY - touchY) * 2;
    teamHierarchy.scrollLeft = startScrollLeft + walkX;
    teamHierarchy.scrollTop = startScrollTop + walkY;
    updatePopupPosition();
  });

  teamHierarchy.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  teamHierarchy.addEventListener("mousedown", (e) => {
    isDragging = true;
    teamHierarchy.style.cursor = "grabbing";
    startX = e.pageX - teamHierarchy.offsetLeft;
    startY = e.pageY - teamHierarchy.offsetTop;
    scrollLeft = teamHierarchy.scrollLeft;
    scrollTop = teamHierarchy.scrollTop;
  });
  
  teamHierarchy.addEventListener("mouseleave", () => {
    isDragging = false;
    teamHierarchy.style.cursor = "grab";
  });
  
  teamHierarchy.addEventListener("mouseup", () => {
    isDragging = false;
    teamHierarchy.style.cursor = "grab";
  });
  
  teamHierarchy.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - teamHierarchy.offsetLeft;
    const y = e.pageY - teamHierarchy.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    teamHierarchy.scrollLeft = scrollLeft - walkX;
    teamHierarchy.scrollTop = scrollTop - walkY;
    updatePopupPosition();
  });
  
  teamHierarchy.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      scale = Math.max(0.5, Math.min(2, scale + delta));
      const hierarchyTree = teamHierarchy.querySelector(".hierarchy-tree");
      if (hierarchyTree) {
        hierarchyTree.style.transform = `scale(${scale})`;
        updatePopupPosition();
      }
    }
  }, { passive: false });
});
