import api from '@/config/api';
import {useState} from 'react';
import useSWR from 'swr';
import {toast} from "react-toastify";

const fetcher = (url: string) => api.get(url).then(res => res.data).then(data => data.data);

interface AddBranchModalProps {
  onClose: () => void;
  mutate: any
}

interface FormData {
  name: string;
  address: string;
  city: string;
  category: string;
  id_grp: string;
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({onClose, mutate}) => {

  const {
    data,
    isLoading,
    error,
  } = useSWR('/gathering-point', fetcher);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    city: '',
    category: '',
    id_grp: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (formData.category == '0') {
      api.post("/transaction-point", {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        idBranch: formData.id_grp
      }).then(() => {
        mutate().then(() => {
          let notify = () => toast.info("Thao tác thành công")
          notify();
          onClose();
        })
      }).catch(() => {
        let notify = () => toast.error("Đã có lỗi xảy ra")
        notify();
      })
    } else {
      api.post("/gathering-point", {
        name: formData.name,
        address: formData.address,
        city: formData.city,
      }).then(() => {
        let notify = () => toast.info("Thao tác thành công")
        notify();
        onClose();
      }).catch(() => {
        let notify = () => toast.error("Đã có lỗi xảy ra")
        notify();
      })
    }
  };

  const renderAdditionalSelect = () => {
    if (formData.category === '0') {
      // Render additional select or any other UI elements for "Điểm giao dịch"
      return (
        <div>
          <label htmlFor="id_grp" className="block mb-2 text-sm font-medium text-textColor1">
            Điểm tập kết trực thuộc
          </label>
          <select
            onChange={handleChange}
            id="id_grp"
            name="id_grp"
            className="bg-gray-50 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
          >
            <option value=''>Chọn điểm tập kết</option>
            {data &&
              data.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      );
    }
    return null; // Render nothing if "Điểm tập kết" or no category is selected
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 "
    >
      <div className="relative p-4 m-10 bg-bgColor1 rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
          <h3 id="modalTitle" className="text-lg font-semibold text-titleColor1">
            Thêm chi nhánh
          </h3>
          <button
            type="button"
            className="text-textColor2 bg-transparent hover:bg-gray-200 hover:text-textColor1 rounded-lg p-1 focus:outline-none"
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
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-textColor1">
                Tên
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                placeholder="Tên chi nhánh"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-textColor1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                placeholder="Địa chỉ chi nhánh"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-textColor1">
                Thành phố
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                placeholder="Chi nhánh thuộc thành phố"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-textColor1">
                Loại chi nhánh
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-bgColor2 border border-gray-300 text-textColor1 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-3"
              >
                <option value="">Chọn chi nhánh</option>
                <option value="0">Điểm giao dịch</option>
                <option value="1">Điểm tập kết</option>
              </select>
            </div>
            {renderAdditionalSelect()}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
          >
            Thêm chi nhánh
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBranchModal;
