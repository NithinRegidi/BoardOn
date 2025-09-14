const axios = require('axios');
const baseURL = 'http://localhost:5000';

async function testErrors() {
    const tests = [
        { 
            url: '/', 
            expected: 200, 
            shouldContain: 'BoardOn Project',
            description: 'Root route'
        },
        { 
            url: '/listings', 
            expected: 200, 
            shouldContain: 'All Listings',
            description: 'Listings page'
        },
        { 
            url: '/nonexistent', 
            expected: 404, 
            shouldContain: 'Error 404',
            customErrorPage: true,
            description: '404 - Page not found'
        },
        { 
            url: '/listings/invalid-id', 
            expected: 400, 
            shouldContain: 'Error 400',
            customErrorPage: true,
            description: '400 - Invalid ObjectId'
        },
        { 
            url: '/listings/507f1f77bcf86cd799439011', 
            expected: 404, 
            shouldContain: 'Error 404',
            customErrorPage: true,
            description: '404 - Listing not found'
        }
    ];

    console.log('🧪 Testing Error Handling & Custom Error Pages\n');

    for (let test of tests) {
        try {
            const response = await axios.get(baseURL + test.url);
            const html = response.data;
            
            // Check status code
            const statusMatch = response.status === test.expected;
            
            // Check if custom error page content is present
            const contentMatch = test.shouldContain ? html.includes(test.shouldContain) : true;
            
            // Check if it's using custom error template
            const hasCustomErrorPage = test.customErrorPage ? 
                (html.includes('Back to Listings') && html.includes('fas fa-exclamation-triangle')) : true;

            console.log(`${statusMatch && contentMatch && hasCustomErrorPage ? '✅' : '❌'} ${test.description}`);
            console.log(`   URL: ${test.url}`);
            console.log(`   Status: ${response.status} (expected ${test.expected}) ${statusMatch ? '✅' : '❌'}`);
            
            if (test.shouldContain) {
                console.log(`   Content: "${test.shouldContain}" ${contentMatch ? '✅' : '❌'}`);
            }
            
            if (test.customErrorPage) {
                console.log(`   Custom Error Page: ${hasCustomErrorPage ? '✅' : '❌'}`);
            }
            
        } catch (error) {
            const status = error.response?.status;
            const html = error.response?.data || '';
            
            const statusMatch = status === test.expected;
            const contentMatch = test.shouldContain ? html.includes(test.shouldContain) : true;
            const hasCustomErrorPage = test.customErrorPage ? 
                (html.includes('Back to Listings') && html.includes('fas fa-exclamation-triangle')) : true;

            console.log(`${statusMatch && contentMatch && hasCustomErrorPage ? '✅' : '❌'} ${test.description}`);
            console.log(`   URL: ${test.url}`);
            console.log(`   Status: ${status} (expected ${test.expected}) ${statusMatch ? '✅' : '❌'}`);
            
            if (test.shouldContain) {
                console.log(`   Content: "${test.shouldContain}" ${contentMatch ? '✅' : '❌'}`);
            }
            
            if (test.customErrorPage) {
                console.log(`   Custom Error Page: ${hasCustomErrorPage ? '✅' : '❌'}`);
                
                // Additional checks for custom error page
                if (hasCustomErrorPage) {
                    console.log(`     - Has error icon: ${html.includes('fas fa-exclamation-triangle') ? '✅' : '❌'}`);
                    console.log(`     - Has "Back to Listings" button: ${html.includes('Back to Listings') ? '✅' : '❌'}`);
                    console.log(`     - Uses custom styling: ${html.includes('container py-5') ? '✅' : '❌'}`);
                }
            }
        }
        
        console.log(''); // Empty line for readability
    }
}

testErrors().catch(console.error);