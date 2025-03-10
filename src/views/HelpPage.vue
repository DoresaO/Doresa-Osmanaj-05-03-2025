<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: "Lorem ipsum dolor sit amet?",
          answer:
            "Consectetur adipiscing elit. Ut feugiat metus ut felis ullamcorper.",
          open: false,
        },
        {
          question: "Sed do eiusmod tempor incididunt ut labore?",
          answer:
            "Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
          open: false,
        },
        {
          question:
            "Quis nostrud exercitation ullamco laboris nisi ut aliquip?",
          answer:
            "Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
          open: false,
        },
        {
          question: "Excepteur sint occaecat cupidatat non proident?",
          answer:
            "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
          open: false,
        },
        {
          question: "Curabitur pretium tincidunt lacus?",
          answer: "Nullam volutpat libero at vestibulum. Suspendisse potenti.",
          open: false,
        },
      ],
    };
  },
  methods: {
    toggleFAQ(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
  },
};
</script>
<template>
  <div class="help-page">
    <div class="container">
      <div class="help-content">
        <div class="faq-container">
          <h4 class="faq-title">Frequently Asked Questions</h4>
          <div class="faq-box">
            <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
              <div class="faq-question" @click="toggleFAQ(index)">
                <span>{{ faq.question }}</span>
                <i
                  :class="
                    faq.open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
                  "
                ></i>
              </div>
              <transition name="fade">
                <div v-if="faq.open" class="faq-answer">
                  <p>{{ faq.answer }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="contact-container">
          <h4 class="contact-title">
            <i class="fas fa-envelope"></i> Contact Administration
          </h4>
          <p class="contact-text">For further assistance, contact:</p>
          <p class="contact-email">support@sems.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-page {
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}
.help-content {
  display: flex;
  justify-content: space-between;
  width: 83%;
  gap: 80px;
  align-items: flex-start;
  flex-grow: 1;
}
.faq-container {
  flex: 1.4;
}
.faq-title {
  font-size: 22px;
  font-weight: bold;
  color: black;
  margin-bottom: 15px;
}
.faq-box {
  margin-top: 20px;
}
.faq-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.faq-item .faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: black;
}
.faq-item:hover {
  color: #333;
}
.faq-answer {
  padding-top: 8px;
  color: black;
}
.contact-container {
  flex: 1;
}
.contact-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
}
.contact-text {
  font-size: 16px;
  color: black;
}
.contact-email {
  font-size: 18px;
  font-weight: bold;
  color: #d32f2f;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .help-content {
    flex-direction: column;
    width: 90%;
  }
  .faq-container,
  .contact-container {
    width: 100%;
  }
}
</style>
