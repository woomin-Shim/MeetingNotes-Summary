import sys
import re
import string
import io
from typing import List
from textrankr import TextRank
from textrankr import TextRank
from konlpy.tag import Komoran   #check


sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')


#동사를 받아 개조식으로 변경
#받침이 있으면 음을 붙이고,
#받침이 없으면 마지막 문자에 ㅁ 받침을 넣음
#불규칙 동사만 예외로 처리
#받침 여부 확인

komoran = Komoran()

#불용어 항목
stop_words = ['아', '휴', '아이구', '아이쿠', '아이고', '어', '나', '우리', '저희', '따라', '의해', '을', '를', '에', '의', '가', '으로', '로', '에게', '뿐이다', '의거하여', 
'근거하여', '입각하여', '기준으로', '예하면', '예를 들면', '예를 들자면', '저', '소인', '소생', '저희', '지말고', '하지마', '하지마라', '다른', '물론', '또한', '그리고', 
'비길수 없다', '해서는 안된다', '뿐만 아니라', '만이 아니다', '만은 아니다', '막론하고', '관계없이', '그치지 않다', '그러나', '그런데', '하지만', '든간에', '논하지 않다', 
'따지지 않다', '설사', '비록', '더라도', '아니면', '만 못하다', '하는 편이 낫다', '불문하고', '향하여', '향해서', '향하다', '쪽으로', '틈타', '이용하여', '타다', '오르다', 
'제외하고', '이 외에', '이 밖에', '하여야', '비로소', '한다면 몰라도', '외에도', '이곳', '여기', '부터', '기점으로', '따라서', '할 생각이다', '하려고하다', '이리하여', 
'그리하여', '그렇게 함으로써', '하지만', '일때', '할때', '앞에서', '중에서', '보는데서', '으로써', '로써', '까지', '해야한다', '일것이다', '반드시', '할줄알다', '할수있다', 
'할수있어', '임에 틀림없다', '한다면', ' 등', '등등', '제', '겨우', '단지', '다만', '할뿐', '딩동', '댕그', '대해서', '대하여', '대하면', '훨씬', '얼마나', '얼마만큼', 
'얼마큼', '남짓', '여', '얼마간', '약간', '다소', '좀', '조금', '다수', '몇', '얼마', '지만', '하물며', '또한', '그러나', '그렇지만', '하지만', '이외에도', '대해 말하자면', 
'뿐이다', '다음에', '반대로', '반대로 말하자면', '이와 반대로', '바꾸어서 말하면', '바꾸어서 한다면', '만약', '그렇지않으면', '까악', '툭', '딱', '삐걱거리다', '보드득', 
'비걱거리 다', '꽈당', '응당', '해야한다', '에 가서', '각', '각각', '여러분', '각종', '각자', '제각기', ' 하도록하다', '와', '과', '그러므로', '그래서', '고로', '한 까닭에', 
'하기 때문에', '거니와', '이지만', '대하여', '관하여', '관한', '과연', '실로', '아니나다를가', '생각한대로', '진짜로', '한적이있다', '하곤하였다', '하', '하하', '허허', '아하', 
'거바', '와', '오', '왜', '어째서', '무엇때문에', '어찌', '하겠는가', '무슨', '어디', '어느곳', '더군다나', '하물며', '더욱이는', '어느때', '언제', '야', '이봐', '어이', '여보시오', 
'흐흐', '흥', '휴', '헉헉', '헐떡헐떡', '영차', '여차', '어기여차', '끙끙', '아야', '앗', '아야', '콸콸', '졸졸', '좍좍', '뚝뚝', '주룩주룩', '솨', '우르르', '그래도', '또', '그리고', 
'바꾸어말하면', '바꾸어말하자면', '혹은', '혹시', '답다', '및', '그에 따르는', '때가 되어', '즉', '지든지', '설령', '가령', '하더라도', '할지라도', '일지라도', '지든지', '몇', '거의', 
'하마터면', '인젠', '이젠', '된바에야', '된이상', '만큼', '어찌됏든', '그위에', '점에서 보아', '비추어 보아', '고려하면', '하게될것이다', '일것이다', '비교적', '좀', '보다더', 
'비하면', '시키다', '하게하다', '할만하다', '의해서', '연이서', '이어서', '잇따라', '뒤따라', '뒤이어', '결국', '의지하여', '기대여', '통하여', '자마자', '더욱더', '불구하고', '얼마든지', 
'마음대로', '주저하지 않고', '곧', '즉시', '바로', '당장', '하자마자', '밖에 안된다', '하면된다', '그래', '그렇지', '요컨대', '다시 말하자면', '바꿔 말하면', '즉', '구체적으로', '말하자면', 
'시작하여', '시초에', '이상', '허', '헉', '허걱', '바와같이', '해도좋다', '텍스트', '해도된다', '게다가', '더구나', '하물며', '와르르', '팍', '퍽', '펄렁', '동안', '이래', '하고있었다', '이었다', 
'에서', '로부터', '까지', '예하면', '했어요', '해요', '함께', '같이', '더불어', '마저', '마저도', '양자', '모두', '습니다', '가까스로', '하려고하다', '즈음하여', '다른', '다른 방면으로', 
'해봐요', '습니까', '했어요', '말할것도 없고', '무릎쓰고', '개의치않고', '하는것만 못하다', ' 하는것이 낫다', '매', '매번', '들', '모', '어느것', '어느', '로써', '갖고말하자면', '어디', 
'어 느쪽', '어느것', '어느해', '어느 년도', '라 해도', '언젠가', '어떤것', '어느것', '저기', '저쪽', '저것', '그때', '그럼', '그러면', '요만한걸', '그래', '그때', '저것만큼', '그저', 
'이르기까지', '할 줄 안다', '할 힘이 있다', '너', '너희', '당신', '어찌', '설마', '차라리', '할지언정', '할지라도', '할망정', '할지언정', '구토하다', '게우다', '토하다', '메쓰겁다', 
'옆사람', '퉤', '쳇', '의거하여', '근거하여', '의해', '따라', '힘입어', '그', '다음', '버금', '두번째로', '기타', '첫번째로', '나머지는', '그중에서', '견지에서', '형식으로 쓰여', 
'입장에서', '위해서', '단지', '의해 되다', '하도록시키다', '뿐만아니라', '반대로', '전후', '전자', '앞의것', '잠시', '잠깐', '하면서', '그렇지만', '다음에', '그러한즉', '그런즉', 
'남들', '아무거나', '어찌하든지', '같다', '비슷하다', '예컨대', '이럴정도로', '어떻게', '만약', '만일', '위에서 서술한바와같이', '인 듯하다', '하지 않는다면', '만약에', '무엇', 
'무슨', '어느', '어떤', '아래윗', '조차', '한데', '그럼에도 불구하고', '여전히', '심지어', '까지도', '조차도', '하지 않도록', '않기 위하여', '때', '시각', '무렵', '시간', '동안', 
'어때', '어떠한', '하여금', '네', '예', '우선', '누구', '누가 알겠는가', '아 무도', '줄은모른다', '줄은 몰랏다', '하는 김에', '겸사겸사', '하는바', '그런 까닭에', '한 이유는', '그러니', 
'그러니까', '때문에', '그', '너희', '그들', '너희들', '타인', '것', '것들', '너', '위하여', '공동으로', '동시에', '하기 위하여', '어찌하여', '무엇때문에', '붕붕', '윙윙', '나', ' 우리', 
'엉엉', '휘익', '윙윙', '오호', '아하', '어쨋든', '차라리', '하 는 편이 낫다', '흐흐', '놀라다', '상대적으로 말하자면', '마치', '아니라면', '쉿', '그렇지 않으면', 
'그렇지 않다면', '안 그러면', '아니었다면', '하든지', '아니면', '이라면', '좋아', '알았어', '하는것도', '그만이다', '어쩔수 없다', '하나', '일', '일반적으로', '일단', '한켠으로는', '오자마 자', 
'이렇게되면', '이와같다면', '전부', '한마디', '한항목', '근거로', '하기에', '아울러', '하지 않도록', '않기 위해서', '이르기까지', '이 되다', '로 인하여', '까닭으로', '이유만으로', '이로  인하여', 
'그래서', '이 때문에', '그러므로', '그런 까닭에', '알 수 있다', '결론을 낼 수 있다', ' 으로 인하여', '있다', '어떤것', '관계가 있다', '관련이 있다', '연관되다', '어떤것들', '에 대해', '이리하여', 
'그리하여', '여부', '하기보다는', '하느니', '하면 할수록', '운운', '이러이러하다', '하구나', '하도다', '다시말하면', '다음으로', '에 있다', '에 달려 있다', '우리', '우리들', '오히려', '하기는한데', 
'어떻게', '어떻해', '어찌됏어', '어때', '어째서', '본대로', '자', '이', '이쪽', '여기', '이것', '이번', '이렇게말하자면', '이런', '이러한', '이와 같은', '요만큼', '요만한 것', '얼마 안 되는 것', 
'이만큼', '이 정도의', '이렇게 많은 것', '이와 같다', '이때', '이렇구나', '것과 같이', '끼익', '삐걱', '따위', '와 같은 사람들', '부류의 사람들', '왜냐하면', '중의하나', '오직', '오로지', '에 한하다', 
'하기만 하면', '도착하다', '까지 미치다', '도달하다', '정도에 이 르다', '할 지경이다', '결과에 이르다', '관해서는', '여러분', '하고 있다', '한 후', '혼자', '자기', '자기집', '자신', '우에 종합한것과같이', 
'총적으로 보면', '총적으로 말하면', '총적으로', '대 로 하다', '으로서', '참', '그만이다', '할 따름이다', '쿵', '탕탕', '쾅쾅', '둥둥', '봐', '봐라', '아이야', '아니', '와아', '응', '아이', '참나', '년', 
'월', '일', '령', '영', '일', '이', '삼', '사', '오', '육', '륙', '칠', '팔', '구', '이천육', '이천칠', '이천팔', '이천구', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '령', '영',
'이게', '저게', '요게', '이렇게', '저렇게', '요렇게', '그렇게']


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


def getResult(text):
    linecount = 0
    listtext = text.split(",")
    for i in listtext:
        linecount += 1
        text = text.replace(",", "\n")


    class MyTokenizer:
        def __call__(self, text: str) -> List[str]:
            tokens: List[str] = text.split()
            tokens = [x for x in tokens if x not in stop_words]
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
        fixedline += ". \n"
    fixedline = fixedline[:-1]
    #print("요약 후 :")
    print(fixedline)
    #return fixedline

    

if __name__ == '__main__':
    #argument = sys.argv[1]
    #del argument[0]
    getResult(sys.argv[1])