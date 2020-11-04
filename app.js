





















const http = require('http');
const url = require('url');

onRequest = (req,res) => {
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<h1>Hello from Node!!</h1><h2>Hello from me!!</h2>')

    var url = req.url;
    if(url === '/add') {
        res.write('This page has been added')
        res.end()
    }
    else if(url ==='/contact') { 
        res.write(' Welcome to contact us page');  
        res.end();  
    } 
    
    res.end()
}



let server = http.createServer(onRequest)

server.listen(4000, () => console.log('Sever is running') )