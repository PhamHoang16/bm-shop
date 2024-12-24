import api from '@/config/api';
import {useState} from 'react';
import useSWR from 'swr';
import {toast} from "react-toastify";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);

interface AddStaffModalProps {
  onClose: () => void;
  mutate: any;
  idBranch: any;
}

interface FormData {
  username: string;
  password: string;
  role: string;
  idBranch: string;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({onClose, mutate, idBranch}) => {

  const {
    data,
    isLoading,
    error,
  } = useSWR('/office/all', fetcher);

  const returnFormData = (id: string) => {
    if (id === 'undefined' || !id) {
      return {
        username: '',
        password: '',
        role: '',
        idBranch: ''
      }
    } else {
      return {
        username: '',
        password: '',
        role: id.includes('TSP') ? 'TELLERS' : 'COORDINATOR',
        idBranch: id
      }
    }

  }

  const [formData, setFormData] = useState<FormData>(returnFormData(idBranch));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.username.length >= 24) {
      let notify = () => toast.warning("Tên tài khoản cần ít hơn 24 kí tự!")
      notify();
    } else if (formData.password.length >= 24) {
      let notify = () => toast.warning("Độ dài mật khẩu cần ít hơn 24 kí tự!")
      notify();
    } else {
      api.post("/user", formData).then(() => {
        mutate().then(() => {
          let notify = () => toast.info("Thao tác thành công")
          notify();
          onClose();
        })
      }).catch(() => {
        let notify = () => toast.error("Đã có lỗi xảy ra")
        notify();
      })
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50"
    >
      <div className="relative p-4 m-10 bg-bgColor1 rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <h3 id="modalTitle" className="text-lg font-semibold text-textColor1">
            Thêm tài khoản
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-textColor1 rounded-lg p-1 focus:outline-none"
            onClick={onClose}
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-textColor1">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                placeholder="Tên người dùng"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-textColor1">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                placeholder="Mật khẩu cho tài khoản"
                required
              />
            </div>

            {(idBranch == 'undefined' || !idBranch) &&
                <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-textColor1">
                        Vị trí nhân viên
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                    >
                        <option value="">Chọn vai trò</option>
                        <option value="TRANSACTION_POINT_MANAGER">Trưởng điểm giao dịch</option>
                        <option value="GATHERING_POINT_MANAGER">Trưởng điểm tập kết</option>
                    </select>
                </div>
            }

            {(idBranch == 'undefined' || !idBranch) &&
                <div>
                    <label htmlFor="idBranch" className="block mb-2 text-sm font-medium text-textColor1">
                        Chi nhánh trực thuộc
                    </label>
                    <select
                        id="idBranch"
                        name="idBranch"
                        value={formData.idBranch}
                        onChange={handleChange}
                        className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
                    >
                        <option value="">Chọn chi nhánh</option>
                      {data &&
                        data.transactionPoint.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      {data &&
                        data.gatheringPoint.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                </div>
            }
          </div>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
          >
            Thêm tài khoản
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
