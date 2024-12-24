'use client';

export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-6">
          <div className="text-6xl font-bold text-gray-900">404</div>
          <div className="mt-4 text-xl font-semibold text-gray-700">
            페이지를 찾을 수 없습니다
          </div>
          <p className="mt-2 text-gray-600">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다
          </p>
        </div>
        <button onClick={handleGoHome}>홈으로 돌아가기</button>
      </div>
    </div>
  );
}
