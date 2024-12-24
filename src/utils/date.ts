export interface DateRange {
  startDate: Date | string,
  endDate: Date | string
}

export function subDays(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() - amount);
  return result;
}

export function getCurrentDate(): string {
  const today: Date = new Date();

  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
  const day: number = today.getDate();

  // Định dạng tháng và ngày để đảm bảo có hai chữ số
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  // Tạo chuỗi yyyy-mm-dd
  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}

export const getTimeDaysArray = (dateRange: DateRange) => {
  const daysArray = [];
  let currentDate = new Date(dateRange.startDate);

  // Loop từ ngày bắt đầu đến ngày kết thúc
  while (currentDate <= new Date(dateRange.endDate)) {
    daysArray.push(currentDate.getTime());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return daysArray;
};

export function formatTimestamp(timestamp: number) {
  // Tạo đối tượng Date từ số long timestamp
  var date = new Date(timestamp);

  // Lấy thông tin giờ, phút, ngày, tháng, năm
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần cộng thêm 1
  var year = date.getFullYear();

  // Tạo chuỗi định dạng
  var formattedDate = hours + ':' + minutes + ', ' + day + '-' + month + '-' + year;

  return formattedDate;
}

export function getFirstDateOfWeek(date: Date) {
  // Lấy ngày trong tuần của ngày hiện tại (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
  var dayOfWeek = date.getDay();

  // Tính toán số ngày cần trừ để đạt được ngày đầu tiên của tuần (thứ Hai)
  var daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Tạo một bản sao của ngày hiện tại và trừ đi số ngày cần
  var firstMonday = new Date(date);
  firstMonday.setDate(date.getDate() - daysToSubtract);

  return firstMonday;
}

export function getFirstDayOfMonth(date: Date) {

  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();

  // Thêm '0' vào trước tháng và ngày nếu chúng có một chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  // Tạo chuỗi có định dạng "yyyy-mm-dd"
  const formattedDate = year + '-' + month + '-' + day;

  return formattedDate;
}