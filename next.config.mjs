/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
    return [
      {
        source: "/api/:path*", // 클라이언트에서 사용하는 API 경로
        destination: `https://assignment-todolist-api.vercel.app/api/${tenantId}/:path*`, // 실제 API 서버
      },
    ];
  },
};

export default nextConfig;
