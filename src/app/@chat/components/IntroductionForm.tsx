import { useState } from 'react';
import { IntroductionMessage } from '../types/chat';

interface FormErrors {
  greeting?: string;
  introduction?: string;
  websiteUrl?: string;
  telephone?: string;
}

interface IntroductionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSendIntroduction: (message: IntroductionMessage) => void;
}

export default function IntroductionForm({
  isOpen,
  onClose,
  onSendIntroduction,
}: IntroductionFormProps) {
  const [formData, setFormData] = useState({
    greeting: '',
    introduction: '',
    websiteUrl: '',
    telephone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.greeting.trim()) {
      newErrors.greeting = '인사말을 입력해주세요';
    } else if (formData.greeting.length > 50) {
      newErrors.greeting = '인사말은 50자 이내로 입력해주세요';
    }

    if (!formData.introduction.trim()) {
      newErrors.introduction = '소개글을 입력해주세요';
    } else if (formData.introduction.length > 200) {
      newErrors.introduction = '소개글은 200자 이내로 입력해주세요';
    }

    if (formData.websiteUrl.trim()) {
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/;

      if (!urlRegex.test(formData.websiteUrl.trim())) {
        newErrors.websiteUrl =
          '올바른 URL 형식이 아닙니다 (예: https://example.com)';
      }
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = '전화번호를 입력해주세요';
    } else {
      const telRegex = /^\d{2,4}\d{3,4}\d{4}$/;
      if (!telRegex.test(formData.telephone)) {
        newErrors.telephone =
          '올바른 전화번호 형식이 아닙니다 (예: 02-1234-5678)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const allTouched = Object.keys(formData).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);
      return;
    }

    const introMessage: IntroductionMessage = {
      type: 'introduction',
      ...formData,
      sender: 'me',
      timestamp: new Date().toISOString(),
    };

    onSendIntroduction(introMessage);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      greeting: '',
      introduction: '',
      websiteUrl: '',
      telephone: '',
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  const isFormErrorKey = (key: string): key is keyof FormErrors => {
    return ['greeting', 'introduction', 'websiteUrl', 'telephone'].includes(
      key
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name] && isFormErrorKey(name)) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[400px] rounded-lg bg-white p-4">
        <h2 className="mb-4 text-lg font-bold">소개 메시지 작성</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              인사말 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="greeting"
              value={formData.greeting}
              onChange={handleChange}
              onBlur={() => handleBlur('greeting')}
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.greeting && errors.greeting
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="예: 안녕하세요! 👋"
            />
            {touched.greeting && errors.greeting && (
              <p className="mt-1 text-sm text-red-500">{errors.greeting}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              소개글 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              onBlur={() => handleBlur('introduction')}
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.introduction && errors.introduction
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="예: 저는 채팅 상담사 Plus입니다."
              rows={3}
            />
            {touched.introduction && errors.introduction && (
              <p className="mt-1 text-sm text-red-500">{errors.introduction}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              웹사이트 (선택)
            </label>
            <input
              type="text"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              onBlur={() => handleBlur('websiteUrl')}
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.websiteUrl && errors.websiteUrl
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="https://example.com"
            />
            {touched.websiteUrl && errors.websiteUrl && (
              <p className="mt-1 text-sm text-red-500">{errors.websiteUrl}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              onBlur={() => handleBlur('telephone')}
              className={`mt-1 w-full rounded-md border p-2 ${
                touched.telephone && errors.telephone
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="02-1234-5678"
            />
            {touched.telephone && errors.telephone && (
              <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              보내기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
