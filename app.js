const Web3 = require('web3');

// Web3 provider 연결을 위한 구문, 해당 링크는 BSC testnet 오픈 노드
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

// Contract의 interface가 정의된 파일
const contractAbi = require('./abi/abi.json');

// 배포된 Contract의 주소
const contractAddress = "0xCDf4d85f47d6eBda73CfDdB8344753DA6cE8792D";

// contract 주소와 abi를 사용하여 contract 불러오기
const contract = new web3.eth.Contract(contractAbi, contractAddress)

// 트랜잭션 요청자의 private key (테스트용, 실제로는 다른 방법으로 해야함)
const privateKey = "a2a52c9e9a259dbb5adfee96c3623cf08c1cef9308548335f54955b5ab748259";

// private key로 account 정보 변환
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);

// web3에 account 추가
web3.eth.accounts.wallet.add(account);

// 변경할 텍스트
const text = "foo";

// 트랜잭션 요청
contract.methods.modifyText(text).send({
    // 요청자와 gas비 설정
    from: account.address,
    gas: 210000
}).on('transactionHash', function(hash){
    // transaction hash 값 반환
    console.log("Tx hash : " + hash);
})

/*
// 쿼리
contract.methods.readText(account.address).call()
.then(function(res){
    console.log("Text : " + res);
})
*/