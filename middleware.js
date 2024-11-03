// export default function middleware(req) {
//     const response = new Response(req.body, {
//         status: req.status,
//         statusText: req.statusText,
//         headers: req.headers
//     });
    
//     response.body = response.body.replace(
//         '</head>',
//         `<script>window.ENV_API_KEY = "${process.env.API_KEY}";</script></head>`
//     );
    
//     return response;
// }

// export const config = {
//     matcher: '/',
// };