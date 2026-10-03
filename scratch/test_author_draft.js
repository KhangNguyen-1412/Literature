const fs = require('fs');

// We verify that the proposed replacement code can be evaluated correctly
const testAuthors = [
  {
    name: 'Nguyễn Du',
    alias: 'Tố Như, Thanh Hiên',
    country: 'Việt Nam',
    years: '1765 - 1820',
    era: 'Văn học Trung đại',
    hometown: 'Làng Tiên Điền, huyện Nghi Xuân, tỉnh Hà Tĩnh',
    style: 'Bậc thầy ngôn từ Nôm, đậm tính hiện thực và tấm lòng nhân đạo bao la',
    masterpieces: 'Truyện Kiều, Văn chiêu hồn, Thanh Hiên thi tập',
    awards: 'Danh nhân văn hóa thế giới (UNESCO 1965)',
    status: 'published',
    avatar: ''
  },
  {
    name: 'Ernest Hemingway',
    alias: 'Papa',
    country: 'Hoa Kỳ',
    years: '1899 - 1961',
    era: 'Văn học Hiện đại',
    hometown: 'Oak Park, Illinois, Hoa Kỳ',
    style: 'Nguyên lý Tảng băng trôi (Iceberg Theory), đanh thép, tinh giản',
    masterpieces: 'Ông già và biển cả, Chuông nguyện hồn ai',
    awards: 'Giải Nobel Văn học (1954), Giải Pulitzer (1953)',
    status: 'published',
    avatar: ''
  }
];

console.log('Test author count:', testAuthors.length);
