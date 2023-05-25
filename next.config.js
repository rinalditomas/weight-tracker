/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  sw: "service-worker.js",
});

module.exports = withPWA({
  // config
})
