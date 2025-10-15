# 情報工学演習I解答例

- [情報工学演習I解答例](#情報工学演習i解答例)
	- [問題1~5](#問題15)
	- [問題6~10](#問題610)
	- [問題11~15](#問題1115)
	- [問題16~](#問題16)


関数をコピーして実行できます(例)
```python
def pro01():
	print(float((int(input())+int(input()))/2.0))

pro01()# <<ここで呼び出し
```

## 問題1~5

``` python
def pro01():
	print(float((int(input())+int(input()))/2.0))

def pro02():
	a1,a2,a3 = int(input()),int(input()),int(input())
	print(str(a1+a2+a3)+"\n"+str(a1*a2*a3))

def pro03():
	a=int(input())
	print(str(int(a/10))+", "+str(a%10))

def pro04():
	a,b,c = int(input()),int(input()),int(input())
	D = float(b**2-4*a*c)
	if (D < 0):
		print("None")
	elif (D == 0):
		print(float(-b/(2*a)))
	else:
		print(str((-b+D**0.5)/(2*a))+", "+str((-b-D**0.5)/(2*a)))

def pro05():
	a=int(input())
	print('positive number' if a>0 else 'zero' if a==0 else 'negative number')
```

## 問題6~10

``` python
def pro06():
	a,b = int(input()),int(input())
	print('same' if a==b else "different")

def pro07():
	a = int(input())
	print('multiple of 6' if a%6==0 else 'multiple of 3' if a%3==0 else 'multiple of 2' if a%2==0 else 'neither a multiple of 2 nor a multiple of 3')

def pro08():
	a = int(input())
	if a==0:
		print('zero')
	else:
		if a>0:
			print('positive even' if a%2==0 else 'positive odd')
		else:
			print('negative even' if a%2==0 else 'negative odd')

def pro09():
	n,m = int(input()),int(input())
	print(n**m)

def pro10():
	n = int(input())
	ans = 1
	for i in range(n):
		i+=1
		ans*=i
	print(ans)
```

## 問題11~15

``` python
def pro11():
	n = int(input())
	for i in range(n):
		i+=1
		if n%i==0:
			print(i)

def pro12():
	n = int(input())
	for i in range(n):
		i+=1
		print('FizzBuzz' if i%15==0 else 'Buzz' if i%5==0 else 'Fizz' if i%3==0 else str(i))

def pro13():# 時間制限>約数計算を平方根までの範囲にして解決
	m,n = int(input()),int(input())
	exist = False
	for i in range(n-m+1):
		i+=m
		sum = 0
		for j in range(int(i**0.5)):
			j+=1
			if i%j == 0:
				sum+=j
				if j**2==i:
					continue
				sum+=int(i/j)
		if sum==i*2:
			print(str(i))
			exist = True
	if not exist:
		print('not exist')

def pro14():
	a = int(input())
	print('multiple of 4' if a%4==0 else 'multiple of 4 + '+str(a%4))

def pro15():
	a = int(input())
	days ={
		1:'31',
		2:'28 or 29',
		3:'31',
		4:'30',
		5:'31',
		6:'30',
		7:'31',
		8:'31',
		9:'30',
		10:'31',
		11:'30',
		12:'31'
	}
	if a in days:
		print(days[a])
	else:
		print('Invalid')
```

## 問題16~

``` python
def pro16():
	color = input()
	orders={
		'red':'stop',
		'green':'go',
		'yellow':'slow'
	}
	if color in orders:
		print(orders[color])
	else:
		print('invalid')

def pro17():
	a,b = int(input()),int(input())
	c = input()
	print(str(a+b) if c=='+' else str(a-b) if c=='-' else str(a*b) if c=='*' else str(int(a/b)) if c=='/' else str(a%b))

def pro18():
	numbers = [int(x) for x in input().split(" ")]
	for i in range(len(numbers)):
		for j in range(len(numbers)-(i+1)):
			j+=i+1
			if numbers[i] > numbers[j]:
				numbers[i],numbers[j] = numbers[j],numbers[i]
		print(numbers[i],end=" ")

def pro19():
	numbers = [int(x) for x in input().split(" ")]
	for x in numbers:
		if x%2==0:
			print(x,end=" ")

def pro20():
	strings = [x for x in input().split(" ")]
	for x in strings:
		print(len(x),end=" ")
```