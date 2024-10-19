async function getDocumentHash(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function addDocument() {
    const file = document.getElementById('document').files[0];
    const docHash = await getDocumentHash(file);
    
    const response = await fetch('/add-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docHash })
    });

    const result = await response.text();
    document.getElementById('result').innerText = result;
}

async function verifyDocument() {
    const file = document.getElementById('verifyDocument').files[0];
    const docHash = await getDocumentHash(file);
    
    const response = await fetch('/verify-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docHash })
    });

    const result = await response.json();
    document.getElementById('result').innerText = result.exists ? `Verified! Issuer: ${result.issuer}` : "Document not found";
}
