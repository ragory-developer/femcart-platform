const fs = require('fs');

const errors = `
Error: src/controllers/AdminRoleController.ts(19,41): error TS7006: Parameter 'r' implicitly has an 'any' type.
Error: src/controllers/BrandController.ts(75,48): error TS7006: Parameter 'b' implicitly has an 'any' type.
Error: src/controllers/CartController.ts(150,64): error TS7006: Parameter 'p' implicitly has an 'any' type.
Error: src/controllers/CartController.ts(151,64): error TS7006: Parameter 'v' implicitly has an 'any' type.
Error: src/controllers/CategoryController.ts(69,52): error TS7006: Parameter 'c' implicitly has an 'any' type.
Error: src/controllers/CouponController.ts(115,52): error TS7006: Parameter 'sum' implicitly has an 'any' type.
Error: src/controllers/CouponController.ts(115,57): error TS7006: Parameter 'order' implicitly has an 'any' type.
Error: src/controllers/FacebookAdsController.ts(14,22): error TS7006: Parameter 's' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(52,47): error TS7006: Parameter 'v' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(53,47): error TS7006: Parameter 'p' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(305,52): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(607,52): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(803,59): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(851,50): error TS7006: Parameter 'acc' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(851,55): error TS7006: Parameter 'i' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(852,50): error TS7006: Parameter 'acc' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(852,55): error TS7006: Parameter 'i' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(1024,45): error TS7006: Parameter 'item' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(1077,38): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/OrderController.ts(1124,38): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/PageController.ts(24,40): error TS7006: Parameter 'n' implicitly has an 'any' type.
Error: src/controllers/PageController.ts(24,72): error TS7006: Parameter 'f' implicitly has an 'any' type.
Error: src/controllers/ProductController.ts(628,50): error TS7006: Parameter 'p' implicitly has an 'any' type.
Error: src/controllers/ReviewController.ts(95,55): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/SearchController.ts(140,26): error TS7006: Parameter 'a' implicitly has an 'any' type.
Error: src/controllers/SearchController.ts(140,29): error TS7006: Parameter 'b' implicitly has an 'any' type.
Error: src/controllers/SearchController.ts(193,29): error TS7006: Parameter 'c' implicitly has an 'any' type.
Error: src/controllers/SearchController.ts(194,25): error TS7006: Parameter 'b' implicitly has an 'any' type.
Error: src/controllers/UserController.ts(162,57): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/controllers/UserController.ts(196,54): error TS7006: Parameter 'tx' implicitly has an 'any' type.
Error: src/jobs/mediaCleanupJob.ts(24,22): error TS7006: Parameter 'p' implicitly has an 'any' type.
Error: src/jobs/mediaCleanupJob.ts(36,22): error TS7006: Parameter 'v' implicitly has an 'any' type.
Error: src/jobs/mediaCleanupJob.ts(37,24): error TS7006: Parameter 'c' implicitly has an 'any' type.
Error: src/jobs/mediaCleanupJob.ts(38,20): error TS7006: Parameter 'b' implicitly has an 'any' type.
Error: src/services/CatalogIntegrityService.ts(75,46): error TS7006: Parameter 'p' implicitly has an 'any' type.
Error: src/services/bkashService.ts(18,24): error TS7006: Parameter 's' implicitly has an 'any' type.
Error: src/services/cartService.ts(46,45): error TS7006: Parameter 'p' implicitly has an 'any' type.
Error: src/services/cartService.ts(47,45): error TS7006: Parameter 'v' implicitly has an 'any' type.
Error: src/services/cartService.ts(144,39): error TS7006: Parameter 'u' implicitly has an 'any' type.
Error: src/services/nagadService.ts(18,22): error TS7006: Parameter 's' implicitly has an 'any' type.
Error: src/services/sslcommerzService.ts(16,22): error TS7006: Parameter 's' implicitly has an 'any' type.
Error: src/services/userService.ts(23,37): error TS7006: Parameter 'u' implicitly has an 'any' type.
Error: src/services/userService.ts(35,42): error TS7006: Parameter 'sum' implicitly has an 'any' type.
Error: src/services/userService.ts(35,47): error TS7006: Parameter 'o' implicitly has an 'any' type.
Error: src/services/walletService.ts(53,49): error TS7006: Parameter 'newTx' implicitly has an 'any' type.
Error: src/utils/sms.ts(14,20): error TS7006: Parameter 's' implicitly has an 'any' type.
`.trim().split('\n');

for (const line of errors) {
    const match = line.match(/Error: (.+?)\((\d+),(\d+)\): error TS7006: Parameter '(.+?)' implicitly has an 'any' type/);
    if (!match) continue;
    
    const file = match[1];
    const row = parseInt(match[2]) - 1;
    const col = parseInt(match[3]) - 1;
    const param = match[4];
    
    let content = fs.readFileSync(file, 'utf8').split('\n');
    let lineStr = content[row];
    
    // Inject ": any" safely.
    // the col points to the start of the param.
    if (lineStr.substring(col, col + param.length) === param) {
        content[row] = lineStr.substring(0, col + param.length) + ': any' + lineStr.substring(col + param.length);
        fs.writeFileSync(file, content.join('\n'));
        console.log(`Fixed ${file}:${row+1}:${col+1} (${param})`);
    } else {
        console.log(`Failed to fix ${file}:${row+1}:${col+1} (${param}) - string mismatch! Found: ${lineStr.substring(col, col + param.length)}`);
    }
}
