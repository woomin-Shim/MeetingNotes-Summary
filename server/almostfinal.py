# -*- coding: utf-8 -*-
import sys
import re
import string
from typing import List
from textrankr import TextRank
from textrankr import TextRank
from konlpy.tag import Komoran

#동사를 받아 개조식으로 변경
#받침이 있으면 음을 붙이고,
#받침이 없으면 마지막 문자에 ㅁ 받침을 넣음
#불규칙 동사만 예외로 처리
#받침 여부 확인

komoran = Komoran()

#문서 요약 부분
class MyTokenizer:
    def __call__(self, text: str) -> List[str]:
        tokens: List[str] = text.split()
        return tokens
#전체 문장을 담을 문자열


#받침 ㅅ 삭제 후 음 붙임
siot_irregular = {"긋","낫","짓","붓","잇","잣","젓","잣"}

#받침 ㄷ -> ㄹ 변경 후 음 붙임
digut_irregular = {"걷", "겯", "닫", "듣", "묻", "붇", "싣", "컫"}

#ㅂ 삭제 움 붙임
biup_irregular = {"굽", "깁", "눕", "돕", "줍"} 

#마지막 어절 변경
def makeShort(txt:str):
    verbtoken :int = 0
    # 요약 문자열을 어절별로 리스트로 변경하여 저장
    arr = txt.split(' ')
    templastword = arr[-1]
    lastword = []
    j:int = 0
    testline = komoran.pos(arr[-1])

    count:int = -1


    #마지막 어절 동사 및 명사 포함여부 확인
    for i in testline:
        if "NNG" in i :
            lastword.append(i)
            count += 1
        if "VV" in i:
            lastword.append(i)
            count += 1
            verbtoken = 1
        if "SN" in i:
            lastword.append(i)
            count += 1
        if "NNB" in i:
            lastword.append(i)
            count += 1
        if "XSV" in i:
            lastword.append(i)
            count += 1
            verbtoken = 1
    i = 0
    #마지막 어절에서 동사 명사 확인


    #마지막 어절 재구성
    lastwordTxt : str = ""
    for i in lastword:
        lastwordTxt = lastwordTxt + "".join(i)


    list_par = []
    tmplist = list(lastwordTxt)

    #재구성된 어절에서 영어 제거
    hangul = re.compile('[^ ㄱ-ㅣ가-힣0-9]+')
    lastwordTxt = hangul.sub('',lastwordTxt)
    if(verbtoken == 1) :
        lastwordTxt = lastletterchange(lastwordTxt)

    #조사 제거후 다시 리스트에 삽입
    arr[-1] = arr[-1].replace(templastword, lastwordTxt)
    sum = " ".join(arr)
    return(sum)

class MyTokenizer:
    def __call__(self, text: str) -> List[str]:
        tokens: List[str] = text.split()
        return tokens
        
mytokenizer: MyTokenizer = MyTokenizer()
textrank: TextRank = TextRank(mytokenizer)

def summar(textstr : str) :
     tempstr = textstr.split('\n')
     for i in tempstr :
         j = i.split(' ')

#글자에 받침 유무 판단
def isFinalConsonant(wChar : chr) : 
    if(wChar >= 0xac00 and wChar <= 0xd7a3):
        if(int((wChar - 0xac00) % 28 == 0)):
            return 0    # 받침이 없는 글자
        else :
            return 1    # 받침이 있는 글자
    return 2    # 한글이 아님

#동사의 마지막 글자 변경
def lastletterchange(line : str):
    irregular = [False,False,False] #인덱스 앞쪽부터 시옷, 디귿, 비읍 불규칙
    for i in line :
        for j in siot_irregular :
            if j in i:
                #print("시옷불규칙")
                irregular[0] = True
        for j in digut_irregular :
            if j in i:
                #print("디귿불규칙")
                irregular[1] = True
        for j in biup_irregular :
            if j in i:
                #print("비읍불규칙")
                irregular[2] = True

                    
    if(line[-1] == '다') :
        line = line[:-1]
    lword = line[-1]
    check = isFinalConsonant(ord(lword))
    if(check == 0):
        lword = ord(lword) + 16
        line = line[:-1]
        line += chr(lword)
    elif(check == 1):
        if(irregular[0] == True):
            lword = ord(lword) - 19
            line = line[:-1]
            line += chr(lword)
            line += "음" 
        elif(irregular[1] == True):
            lword = ord(lword) + 1
            line = line[:-1]
            line += chr(lword)
            line += "음"     
        elif(irregular[2] == True):
            lword = ord(lword) - 17
            line = line[:-1]
            line += chr(lword)
            line += "움"
        else:
            line = list(line)
            line.append('음')
            line = ''.join(line)
    #line.replace(line[-1],lword)
    return line


def main(text:str):
    

    #text = """손흥민(29·토트넘)의 푸스카스 골이 미국 매체가 선정한 잉글랜드 프로축구 프리미어리그(EPL) 역대 30대 명장면에 선정됐다.,미국 매체 NBC스포츠는 EPL 30주년을 기념해 EPL 역사에 남을 장면 30개를 선정해 매주 순위별로 발표하고 있다.,3일(현지시간)에는 손흥민의 번리전 70m 원더골이 28위로 공개됐다.,손흥민은 2019~2020시즌 EPL 번리와의 16라운드 홈 경기에서 70m를 질주해 원더골을 터트렸다. 이 골로 지난해 국제축구연맹(FIFA)에서 시상한 푸스카스상의 주인공이 됐다.,헝가리 축구 전설 페렌츠 푸스카스의 이름을 딴 푸스카스상은 FIFA가 한 해 동안 최고의 골을 넣은 선수에게 수여 한다.,손흥민의 번리전 득점은 2019년 12월 EPL 이달의 골과 2019~2020시즌 올해의 골에 선정되기도 했다.,NBC스포츠는 손흥민의 번리전 원더골에 대해 "손흥민은 디에고 마라도나를 연상시켰다., 그는 여러 명을 제치고 훌륭한 마무리로 토트넘 팬들을 열광시켰다"고 설명했다.,이어 "손흥민은 항상 멋진 골을 넣었지만 이 득점은 EPL 올해의 골뿐만 아니라 FIFA 푸스카스상에도 선정됐다., 최고의 골이라는 데 이견이 없다"고 덧붙였다.,앞서 29위는 뉴캐슬 유나이티드가 2010~2011시즌 아스널을 상대로 0-4로 뒤지다가 4-4 동점을 만든 경기가 뽑혔고 30위는 아스널 레전드 공격수 데니스 베르캄프의 1997~1998시즌 해트트릭이 선정됐다."""

    linecount = 0
    listtext = text.split(",")
    for i in listtext:
        linecount += 1


    class MyTokenizer:
        def __call__(self, text: str) -> List[str]:
            tokens: List[str] = text.split()
            return tokens
        
    mytokenizer: MyTokenizer = MyTokenizer()
    textrank: TextRank = TextRank(mytokenizer)

    #요약할 줄 수
    summary_ratio = int(linecount * 0.4)

    summarized: str = textrank.summarize(text, summary_ratio)


    txt = summarized
    line = txt.split(',')
    hangul = re.compile('[^ ㄱ-ㅣ가-힣\n0-9a-zA-Z]')
    line = hangul.sub('',txt)
    line = line.split('\n')
    fixedline : str = ""

    for i in line :
        fixedline += makeShort(i)
        fixedline += "\n"
    fixedline = fixedline[:-1]
    #print("요약 후 :")
    #print(fixedline)
    return fixedline



if __name__ == "__main__":
    argument = sys.argv
    del argument[0]
    main(argument[0])
