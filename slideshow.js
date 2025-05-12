class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
    this.visibleItems = window.innerWidth <= 768 ? 3 : 5; // Number of visible items at once

    // Drag functionality
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.threshold = 100; // minimum distance to trigger slide
    this.touchStartTime = 0;
    this.touchEndTime = 0;

    this.setupDragListeners();
    this.setupPreviewModal();
  }

  setupDragListeners() {
    // Mouse events
    this.carouselContainer.addEventListener("mousedown", (e) =>
      this.startDragging(e)
    );
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.stopDragging());

    // Touch events
    this.carouselContainer.addEventListener("touchstart", (e) => {
      this.touchStartTime = new Date().getTime();
      this.startDragging(e);
    });
    document.addEventListener("touchmove", (e) => this.drag(e));
    document.addEventListener("touchend", (e) => {
      this.touchEndTime = new Date().getTime();
      this.stopDragging();
      
      // Check if it was a tap (short duration touch)
      if (this.touchEndTime - this.touchStartTime < 200) {
        const centerImage = this.carouselArray.find(img => 
          window.innerWidth <= 768 ? img.classList.contains('i2') : img.classList.contains('i3')
        );
        if (centerImage) {
          const modal = document.querySelector(".preview-modal");
          const previewImage = modal.querySelector(".preview-image");
          previewImage.src = centerImage.src;
          modal.classList.add("active");
        }
      }
    });
  }

  setupPreviewModal() {
    // Create modal if it doesn't exist
    if (!document.querySelector(".preview-modal")) {
      const modal = document.createElement("div");
      modal.className = "preview-modal";
      modal.innerHTML = `
        <div class="preview-content">
          <button class="close-preview">&times;</button>
          <img class="preview-image" src="" alt="Preview">
        </div>
      `;
      document.body.appendChild(modal);

      // Close modal when clicking outside or on close button
      modal.addEventListener("click", (e) => {
        if (
          e.target === modal ||
          e.target.classList.contains("close-preview")
        ) {
          modal.classList.remove("active");
        }
      });
    }

    // Add click event to center image
    this.carouselArray.forEach((item) => {
      item.addEventListener("click", () => {
        const isCenterImage = window.innerWidth <= 768 
          ? item.classList.contains("i2") 
          : item.classList.contains("i3");
          
        if (isCenterImage) {
          const modal = document.querySelector(".preview-modal");
          const previewImage = modal.querySelector(".preview-image");
          previewImage.src = item.src;
          modal.classList.add("active");
        }
      });
    });
  }

  startDragging(e) {
    this.isDragging = true;
    this.carouselContainer.classList.add("dragging");
    this.startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
    this.currentX = this.startX;
  }

  drag(e) {
    if (!this.isDragging) return;
    e.preventDefault();

    this.currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
    const diff = this.currentX - this.startX;

    // Determine direction and trigger slide if threshold is met
    if (Math.abs(diff) >= this.threshold) {
      if (diff > 0) {
        this.setCurrentState(
          this.carouselControls.querySelector(".gallery-controls-previous")
        );
      } else {
        this.setCurrentState(
          this.carouselControls.querySelector(".gallery-controls-next")
        );
      }
      this.stopDragging();
    }
  }

  stopDragging() {
    this.isDragging = false;
    this.carouselContainer.classList.remove("dragging");
  }

  updateGallery() {
    // First remove all position classes
    this.carouselArray.forEach((el) => {
      el.classList.remove("i1", "i2", "i3", "i4", "i5");
      el.style.opacity = "";
      el.style.zIndex = "";
    });

    // Add position classes to the first 5 items
    for (let i = 0; i < this.visibleItems; i++) {
      const el = this.carouselArray[i];
      if (el) {
        el.classList.add(`i${i + 1}`);
      }
    }
  }

  setCurrentState(direction) {
    if (direction.className.includes("gallery-controls-previous")) {
      // Move last item to the front
      const lastItem = this.carouselArray[this.carouselArray.length - 1];
      this.carouselArray = [lastItem, ...this.carouselArray.slice(0, -1)];
    } else {
      // Move first item to the end
      const firstItem = this.carouselArray[0];
      this.carouselArray = [...this.carouselArray.slice(1), firstItem];
    }
    this.updateGallery();
  }

  setControls() {
    // Clear existing controls first
    this.carouselControls.innerHTML = "";

    ["previous", "next"].forEach((control) => {
      const button = document.createElement("button");
      button.className = `gallery-controls-${control}`;
      button.innerText = control;
      this.carouselControls.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...this.carouselControls.childNodes];
    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

function initGalleries() {
  const galleryContainers = document.querySelectorAll("[data-gallery]");

  galleryContainers.forEach((container) => {
    const galleryId = container.dataset.gallery;
    const controlsContainer = document.querySelector(
      `[data-controls="${galleryId}"]`
    );
    const items = container.querySelectorAll(".gitem");

    if (container && controlsContainer && items.length) {
      const carousel = new Carousel(container, items, controlsContainer);
      carousel.setControls();
      carousel.useControls();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initGalleries);