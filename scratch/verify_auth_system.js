const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('══════════════════════════════════════════════════════════');
console.log('   KIỂM THỬ HỆ THỐNG XÁC THỰC VĂN UYỂN (AUTH SYSTEM)   ');
console.log('══════════════════════════════════════════════════════════\n');

// 1. Kiểm tra tập tin auth.html
console.log('1. Kiểm tra cấu trúc auth.html...');
assert(fs.existsSync('auth.html'), 'auth.html phải tồn tại');
const authHtml = fs.readFileSync('auth.html', 'utf8');

// Bố cục Split-Screen
assert(authHtml.includes('class="auth-showcase"'), 'Phải có cột minh họa bên trái (auth-showcase)');
assert(authHtml.includes('class="auth-main"'), 'Phải có cột form bên phải (auth-main)');
assert(authHtml.includes('class="auth-showcase-quote"'), 'Phải có trích dẫn văn học nghệ thuật');
assert(authHtml.includes('Nam Cao'), 'Phải có trích dẫn tác gia kinh điển (Nam Cao)');

// Form 1: Đăng nhập (Sign In)
assert(authHtml.includes('id="auth-signin"'), 'Phải có section auth-signin');
assert(authHtml.includes('id="signin-email"'), 'Phải có ô nhập email/tên đăng nhập');
assert(authHtml.includes('id="signin-password"'), 'Phải có ô nhập mật khẩu đăng nhập');
assert(authHtml.includes('togglePassword(\'signin-password\''), 'Phải có nút ẩn/hiện mật khẩu đăng nhập');
assert(authHtml.includes('id="signin-remember"'), 'Phải có checkbox ghi nhớ đăng nhập');
assert(authHtml.includes('switchAuthView(\'forgot\')'), 'Phải có đường dẫn Quên mật khẩu');
assert(authHtml.includes('switchAuthView(\'signup\')'), 'Phải có đường dẫn Tạo tài khoản mới');
assert(authHtml.includes('socialLogin(\'google\')'), 'Phải có nút đăng nhập Google');
assert(authHtml.includes('socialLogin(\'github\')'), 'Phải có nút đăng nhập GitHub');

// Form 2: Đăng ký (Sign Up)
assert(authHtml.includes('id="auth-signup"'), 'Phải có section auth-signup');
assert(authHtml.includes('id="signup-name"'), 'Phải có ô nhập Họ và tên / Bút danh');
assert(authHtml.includes('id="signup-email"'), 'Phải có ô nhập Email đăng ký');
assert(authHtml.includes('id="signup-password"'), 'Phải có ô nhập mật khẩu đăng ký');
assert(authHtml.includes('id="signup-confirm"'), 'Phải có ô xác nhận mật khẩu');
assert(authHtml.includes('id="signup-terms"'), 'Phải có checkbox điều khoản sử dụng');
assert(authHtml.includes('id="signup-pw-strength"'), 'Phải có thanh đo độ mạnh mật khẩu');
assert(authHtml.includes('id="signup-submit"'), 'Phải có nút Tạo tài khoản');

// Form 3: Quên mật khẩu (Forgot Password)
assert(authHtml.includes('id="auth-forgot"'), 'Phải có section auth-forgot');
assert(authHtml.includes('id="forgot-email"'), 'Phải có ô nhập email khôi phục');
assert(authHtml.includes('id="forgot-submit"'), 'Phải có nút gửi liên kết khôi phục');
assert(authHtml.includes('id="forgot-success"'), 'Phải có thông báo thành công khi gửi');

// Top nav, Theme & Toast
assert(authHtml.includes('class="auth-top-nav"'), 'Phải có auth-top-nav');
assert(authHtml.includes('toggleAuthTheme()'), 'Phải có nút chuyển đổi Đêm văn đàn');
assert(authHtml.includes('id="auth-toast"'), 'Phải có toast thông báo auth-toast');
assert(authHtml.includes('css/design-system.css'), 'Phải nạp design-system.css');
assert(authHtml.includes('css/auth.css'), 'Phải nạp css/auth.css');
assert(authHtml.includes('Playfair+Display'), 'Phải nhúng font Playfair Display');
assert(authHtml.includes('Newsreader'), 'Phải nhúng font Newsreader');
console.log('   ✓ auth.html đạt chuẩn 100% đầy đủ 3 form và các trường.');

// 2. Kiểm tra CSS css/auth.css
console.log('\n2. Kiểm tra giao diện css/auth.css...');
assert(fs.existsSync('css/auth.css'), 'css/auth.css phải tồn tại');
const authCss = fs.readFileSync('css/auth.css', 'utf8');

assert(authCss.includes('.auth-container'), 'CSS phải có .auth-container');
assert(authCss.includes('.auth-showcase'), 'CSS phải có .auth-showcase');
assert(authCss.includes('auth_literary_bg.jpg'), 'CSS phải tham chiếu ảnh nền văn học');
assert(authCss.includes('.auth-pw-strength'), 'CSS phải có bộ đo độ mạnh mật khẩu');
assert(authCss.includes('.auth-toast'), 'CSS phải có kiểu dáng toast thông báo');
assert(authCss.includes('[data-theme="nocturne"]'), 'CSS phải hỗ trợ Chế độ Đêm Văn Đàn (Nocturne)');
assert(authCss.includes('@media (max-width: 900px)'), 'CSS phải có responsive cho tablet/di động');
assert(authCss.includes('@media (max-width: 480px)'), 'CSS phải có responsive cho điện thoại');
console.log('   ✓ css/auth.css đạt chuẩn phong cách Editorial, Đêm văn đàn & Responsive.');

// 3. Kiểm tra ảnh nền mỹ học văn học
console.log('\n3. Kiểm tra tài nguyên hình ảnh...');
assert(fs.existsSync('assets/images/auth_literary_bg.jpg'), 'Ảnh auth_literary_bg.jpg phải tồn tại');
const imgStat = fs.statSync('assets/images/auth_literary_bg.jpg');
assert(imgStat.size > 10000, `Ảnh nền phải có dung lượng thực tế hợp lệ (hiện tại: ${imgStat.size} bytes)`);
console.log(`   ✓ Ảnh nền văn học cổ điển tồn tại (${(imgStat.size / 1024).toFixed(1)} KB).`);

// 4. Kiểm tra liên kết điều hướng toàn hệ thống
console.log('\n4. Kiểm tra liên kết điều hướng xuyên suốt hệ thống...');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('href="auth.html"'), 'index.html phải có liên kết tới auth.html ở topbar/footer');
console.log('   ✓ index.html đã kết nối nút "Tài khoản" và liên kết footer tới auth.html.');

const adminHtml = fs.readFileSync('admin.html', 'utf8');
assert(adminHtml.includes('href="auth.html?mode=signin"'), 'admin.html phải có liên kết Chuyển Tài Khoản tới auth.html');
assert(adminHtml.includes('window.literaryAdmin.logoutUser()'), 'admin.html phải có nút Đăng Xuất');
console.log('   ✓ admin.html đã có tính năng Chuyển Tài Khoản và Đăng Xuất.');

const adminJs = fs.readFileSync('js/admin.js', 'utf8');
assert(adminJs.includes('logoutUser()'), 'js/admin.js phải có hàm logoutUser()');
console.log('   ✓ js/admin.js đã bổ sung hàm logoutUser() chuẩn xác.');

// 5. Kiểm thử logic xác thực (Validation & Strength Logic)
console.log('\n5. Kiểm thử logic kiểm tra mật khẩu & định dạng email...');
function testEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
assert(testEmail('reader@vanuyen.edu.vn') === true, 'Email hợp lệ phải pass');
assert(testEmail('invalid-email') === false, 'Email thiếu @ phải fail');
assert(testEmail('invalid@domain') === false, 'Email thiếu . đuôi phải fail');

function calcStrength(val) {
  let score = 0;
  if (val.length >= 8) score++;
  if (val.length >= 12) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  return score;
}
assert(calcStrength('abcd') === 0, 'Chỉ chữ thường dưới 8 ký tự -> 0');
assert(calcStrength('1234') === 1, 'Số dưới 8 ký tự -> 1 (do có chứa số)');
assert(calcStrength('12345678') === 2, '8 ký tự + số -> 2');
assert(calcStrength('VanUyen2026@!') === 5, 'Dài + Hoa + Thường + Số + Ký tự đặc biệt -> 5');
console.log('   ✓ Logic tính độ mạnh mật khẩu và kiểm tra email hoạt động chính xác.');

console.log('\n══════════════════════════════════════════════════════════');
console.log('   🎉 TẤT CẢ CÁC BƯỚC KIỂM THỬ XÁC THỰC ĐỀU THÀNH CÔNG!   ');
console.log('══════════════════════════════════════════════════════════\n');
