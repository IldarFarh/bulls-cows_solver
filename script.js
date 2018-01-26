const len = 4
let candidates_all = []

playBullsAndCows(len)

function playBullsAndCows(len) {
  let num = pickNum(len)

  candidates_all = newArrayOfCandidates(len)

  for (var i = 0; i < 9; i++) {
    quessNumber = candidates_all[0]
    compareResult = countHeads(num, quessNumber)
    console.log('Quess: ' + quessNumber + ' result: '
                   + compareResult.bulls + 'A' + compareResult.cows + 'B array:' + candidates_all.length)
    if (compareResult.bulls == len) {
      console.log('Win! Number was: ' + num)
      return
    } else {
      candidates_all.splice(0,1)
      candidates_all = pruneSet(candidates_all, quessNumber, compareResult)
    }
  }
}

function pickNum(len) {
  nums = [1,4,8,2,5,0,7,3,9,6]
  nums.sort(() => {return Math.random() - 0.5})
  nums.sort(() => {return Math.random() - 0.5})
  nums.sort(() => {return Math.random() - 0.5})
  return nums.slice(0,len).join('')
}

function newArrayOfCandidates(len) {
    let arr = []
    charset = '0123456789'
    charset_min = charset.split('').slice(0,len).join('')
    charset_max = charset.split('').reverse().slice(0,len).join('')
    for(i = charset_min; i <= charset_max; i++) {
      n = ('0'+i).substr(-len).split('')
      if(n.every(val => {
        return (n.indexOf(val) === n.lastIndexOf(val))
      })) {
        arr.push(n.join(''))
      }
    }
    return arr
}

function countHeads(num, quessNumber) {
  quessNumber = quessNumber.split('')
  num = num.split('')
  let count = {bulls:0, cows:0}
  num.forEach((i,n) => {
    if (quessNumber[n] == i) count.bulls++
    else if(quessNumber.indexOf(i) != -1) count.cows++
  })
  return count
}

function pruneSet(candidates_all, quessNumber, compareResult) {
  prunedSet = []
  candidates_all.forEach(i => {
    candidateResult = countHeads(i, quessNumber)
    if (candidateResult.bulls == compareResult.bulls
      && candidateResult.cows == compareResult.cows) prunedSet.push(i)
  })
  return prunedSet
}
