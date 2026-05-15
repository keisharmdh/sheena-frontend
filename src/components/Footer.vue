<script setup lang="ts">
import { ref, onMounted } from "vue";

const API_BASE = "https://sheena-backend-production.up.railway.app/api";

const footerContent = ref<Record<string, string>>({});

const defaultSocialLinks = [
  { platform: "Instagram", url: "https://www.instagram.com/shnco___/" },
  { platform: "Shopee", url: "https://shopee.co.id/shnco___" },
  { platform: "Tiktok", url: "https://www.tiktok.com/@meetthesheena" },
];

const socialLinks = ref<{ platform: string; url: string }[]>(defaultSocialLinks);

const fetchFooterContent = async () => {
  const response = await fetch(`${API_BASE}/admin/home-content`, {
    headers: {
      Accept: "application/json",
    },
  });

  const result = await response.json();
  footerContent.value = result.data || {};

  socialLinks.value = footerContent.value.footer_social_links
    ? JSON.parse(footerContent.value.footer_social_links)
    : defaultSocialLinks;
};

onMounted(fetchFooterContent);
</script>

<template>
  <footer class="footer">
    <div class="container">
      <!-- COL 1 -->
      <div class="col">
        <p class="titlefooter">
  {{ footerContent.footer_about_title || "ABOUT SHEENA" }}
</p>

<p class="desc">
  {{
    footerContent.footer_about_desc ||
    "Crafting timeless elegance since 1985. Each piece tells a story of exceptional craftsmanship and refined design."
  }}
</p>
      </div>

      <!-- COL 2 -->
      <div class="col">
        <p class="titlefooter">SHOP</p>
        <ul>
          <router-link to="/#new-collection" class="footer-link">
            New Arrival
          </router-link>
          <!-- <li>Sale</li> -->
        </ul>
      </div>

      <!-- COL 3 -->
      <div class="col">
        <p class="titlefooter">HELP</p>
        <ul>
          <li><router-link to="/contact-us">Contact Us</router-link></li>
          <li><router-link to="/size-guide">Size Guide</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
        </ul>
      </div>

      <!-- COL 4 -->
      <div class="col">
  <p class="titlefooter">FOLLOW</p>
  <ul>
    <li v-for="social in socialLinks" :key="social.platform">
      <a :href="social.url" target="_blank">
        {{ social.platform }}
      </a>
    </li>
  </ul>
</div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="bottom">
      <p>© 2026 SHEENA. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f9f9f9;
  padding-top: 80px;
}

/* CONTAINER (SAMA SEPERTI HEADER) */

.container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  flex-wrap: wrap;
}

/* COLUMN */

.col {
  flex: 1;
  min-width: 160px;
}

.about {
  flex: 2;
}

/* TITLE */

.titlefooter {
  color: #000;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 22px;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

/* DESCRIPTION */

.desc {
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 16px;
  line-height: 24px;
}

/* LIST */

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 8px;
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 16px;
}

/* LINK */

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}

/* BOTTOM */

.bottom {
  border-top: 1px solid #ddd;
  margin-top: 60px;
  padding: 20px 0;
  text-align: center;
}

.bottom p {
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 12px;
  letter-spacing: 1px;
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 30px;
  }

  .about {
    flex: 1;
  }
}

.footer-link {
  color: #82603d;
  font-family: "FONTSPRING DEMO - The Seasons";
  font-size: 16px;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
