module.exports = {
  apps: [
    {
      name: "phongthodep",

      script: "./src/bin/www.js",

      cwd: "/home/phongthodep/phongthodep200925",

      instances: 1,
      exec_mode: "fork",

      // Biến môi trường
      env: {
        NODE_ENV: "production",
        NODE_NO_WARNINGS: "1"
      },

      // Tự khởi động lại khi crash
      autorestart: true,

      // Giới hạn RAM
      max_memory_restart: "500M",

      // Chờ 5 giây trước khi restart
      restart_delay: 5000,

      // Không theo dõi file
      watch: false,

      // Nếu sau này bật watch thì bỏ qua các thư mục này
      ignore_watch: [
        "node_modules",
        "src/tmp",
        "src/public/site/images",
        "logs",
        ".git"
      ],

      // Log
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",

      merge_logs: true,

      // Chỉ restart khi ứng dụng chết
      cron_restart: null
    }
  ]
};