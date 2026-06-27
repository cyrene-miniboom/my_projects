const achievements = [
  {
    title: "esp32遥控小车",
    type: "项目",
    year: "2025",
    role: "模型组装 \ 算法编写",
    image: "./pictures/esp32-car.png",
    description:
      "3d打印小车外壳，esp32实现电机工作逻辑，并通过esp32的WiFi功能构建网页，实现对小车的控制",
    tags: ["Python", "esp32"],
    award: "",
    links: {
      github: "https://github.com/cyrene-miniboom/esp32-car",
      demo: "https://cyrene-miniboom.github.io/esp32-car"
    }
  },
  {
    title: "arduino实践项目",
    type: "项目",
    year: "2025",
    role: "模型组装 \ 算法编写",
    image: "pictures/IMG_20250608_191339.jpg",
    description:
      "arduino芯片实践项目，多传感器配合，mqtt信息传输，模拟倒车雷达",
    tags: ["arduino", "mqtt", "物联网"],
    award: "",
    links: {
      github: "https://github.com/cyrene-miniboom/arduino-projects",
      demo: "https://cyrene-miniboom.github.io/arduino-projects/"
    }
  },
  {
    title: "虚拟世界：血管微观漫游",
    type: "项目",
    year: "2026",
    role: "内容搭建 / 视频演示",
    image: "pictures/屏幕截图 2026-06-27 165719.png",
    description:
      "在虚拟世界中搭建血管中的微观场景，以期达到在教学中使用的目的",
    tags: ["虚拟世界", "跨学科项目", "元宇宙教学"],
    award: "",
    links: {
      github: "https://cyrene-miniboom/virtual-world/",
      demo: "https://cyrene-miniboom.github.io/virtual-world/"
    }
  },
  {
    title: "实验：seam-carving",
    type: "实验",
    year: "2025",
    role: "数据处理 / 模型实验",
    image: "pictures/lenna.jpg",
    description:
      "对seam-carving算法进行应用与改进",
    tags: ["DIP", "seam-carving", "Python"],
    award: "",
    links: {
      github: "https://github.com/cyrene-miniboom/DIP_seam-carving",
      demo: "https://cyrene-miniboom.github.io/DIP_seam-carving"
    }
  },
  {
    title: "优秀学生奖学金",
    type: "奖项",
    year: "2023",
    role: "个人奖项",
    image: "./assets/competition-1.png",
    description:
      "因学业成绩、项目实践和综合表现获得学院 / 学校奖学金。",
    tags: ["奖学金", "综合表现"],
    award: "校级奖学金",
    links: {
      github: "#",
      demo: "#"
    }
  }
];

let currentType = "全部";

const grid = document.getElementById("projectGrid");
const timelineList = document.getElementById("timelineList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter");

function renderCards() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = achievements.filter((item) => {
    const matchType = currentType === "全部" || item.type === currentType;
    const searchableText = [
      item.title,
      item.type,
      item.year,
      item.role,
      item.description,
      item.award,
      ...item.tags
    ]
      .join(" ")
      .toLowerCase();

    return matchType && searchableText.includes(keyword);
  });

  grid.innerHTML = filtered
    .map(
      (item) => `
      <article class="card">
        <img src="${item.image}" alt="${item.title}" />
        <div class="card-body">
          <p class="meta">${item.year} · ${item.type} · ${item.role}</p>
          <h3>${item.title}</h3>
          ${
            item.award
              ? `<p><strong>成果：</strong>${item.award}</p>`
              : ""
          }
          <p>${item.description}</p>
          <div class="tag-row">
            ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="card-links">
            <a href="${item.links.github}" target="_blank">代码</a>
            <a href="${item.links.demo}" target="_blank">展示</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  document.getElementById("projectCount").textContent = achievements.length;
  document.getElementById("awardCount").textContent = achievements.filter(
    (item) => item.award
  ).length;
}

function renderTimeline() {
  const sorted = [...achievements].sort((a, b) => b.year.localeCompare(a.year));

  timelineList.innerHTML = sorted
    .map(
      (item) => `
      <div class="timeline-item">
        <p class="meta">${item.year} · ${item.type}</p>
        <h3>${item.title}</h3>
        <p>${item.award ? item.award + " · " : ""}${item.description}</p>
      </div>
    `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentType = button.dataset.type;
    renderCards();
  });
});

searchInput.addEventListener("input", renderCards);

renderCards();
renderTimeline();
