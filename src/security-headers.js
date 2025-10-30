// security-headers.js - Добавьте этот файл
export function addSecurityHeaders() {
    // Добавляем security headers если возможно
    if (typeof document !== 'undefined') {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'X-Content-Type-Options';
        meta.content = 'nosniff';
        document.head.appendChild(meta);
        
        const meta2 = document.createElement('meta');
        meta2.httpEquiv = 'X-Frame-Options';
        meta2.content = 'DENY';
        document.head.appendChild(meta2);
    }
}

// Вызовите в main.js
addSecurityHeaders();