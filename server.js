const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.zip': 'application/zip',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

// Đảm bảo thư mục lưu ảnh bìa và ảnh tác giả tồn tại
const COVERS_DIR = path.join(__dirname, 'assets', 'images', 'covers');
if (!fs.existsSync(COVERS_DIR)) {
  fs.mkdirSync(COVERS_DIR, { recursive: true });
}
const AUTHORS_DIR = path.join(__dirname, 'assets', 'images', 'authors');
if (!fs.existsSync(AUTHORS_DIR)) {
  fs.mkdirSync(AUTHORS_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || '127.0.0.1:3000'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // API LƯU ẢNH BÌA TRỰC TIẾP VÀO THƯ MỤC DỰ ÁN
  if (req.method === 'POST' && (pathname === '/api/upload-cover' || pathname === '/api/upload')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Giới hạn tải lên tối đa 30MB
      if (body.length > 30 * 1024 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Kích thước tệp quá lớn (>30MB)' }));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const { workId, authorId, type, fileName, fileData } = payload;

        if (!fileData) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'Thiếu dữ liệu tệp ảnh' }));
          return;
        }

        // Tách chuỗi Base64
        const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let ext = '.jpg';
        let buffer;

        if (matches) {
          const mimeType = matches[1];
          buffer = Buffer.from(matches[2], 'base64');
          if (mimeType.includes('png')) ext = '.png';
          else if (mimeType.includes('webp')) ext = '.webp';
          else if (mimeType.includes('svg')) ext = '.svg';
          else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';
        } else {
          // Trường hợp base64 thuần
          buffer = Buffer.from(fileData, 'base64');
          if (fileName) {
            const parsedExt = path.extname(fileName).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(parsedExt)) {
              ext = parsedExt;
            }
          }
        }

        const isAuthor = type === 'author' || Boolean(authorId);
        const entityId = authorId || workId || (isAuthor ? 'author' : 'cover');
        const sanitizedId = entityId.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
        const timestamp = Date.now();
        const safeFileName = `${sanitizedId}_${timestamp}${ext}`;
        const targetDir = isAuthor ? AUTHORS_DIR : COVERS_DIR;
        const targetPath = path.join(targetDir, safeFileName);
        const relativeFolder = isAuthor ? 'assets/images/authors' : 'assets/images/covers';

        fs.writeFile(targetPath, buffer, (err) => {
          if (err) {
            console.error('[Upload Error]', err);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: 'Không thể ghi tệp vào thư mục dự án' }));
            return;
          }

          const relativePath = `${relativeFolder}/${safeFileName}`;
          console.log(`[Upload Success] Đã lưu ảnh mới (${isAuthor ? 'tác giả' : 'bìa'}): ${relativePath}`);

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({
            success: true,
            filePath: relativePath,
            url: `/${relativePath}`,
            fileName: safeFileName
          }));
        });
      } catch (parseError) {
        console.error('[Upload JSON Parse Error]', parseError);
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Dữ liệu tải lên không hợp lệ' }));
      }
    });
    return;
  }

  // PHỤC VỤ CÁC FILE TĨNH (STATIC FILES)
  let reqPath = pathname === '/' || pathname === '' ? '/index.html' : pathname;
  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n========================================================`);
  console.log(` VĂN UYỂN — HỆ THỐNG PHÒNG ĐỌC & QUẢN TRỊ NỘI DUNG`);
  console.log(` Trang Độc Giả:  http://127.0.0.1:${PORT}/`);
  console.log(` Trang Xác Thực: http://127.0.0.1:${PORT}/auth.html`);
  console.log(` Trang Quản Trị: http://127.0.0.1:${PORT}/admin.html`);
  console.log(` Thư mục ảnh bìa: assets/images/covers/`);
  console.log(`========================================================\n`);
});
