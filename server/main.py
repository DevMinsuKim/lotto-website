import math
import numpy as np
import pandas as pd
import logging
from bs4 import BeautifulSoup
from keras.models import load_model
from logging.handlers import RotatingFileHandler

logging.basicConfig(
    filename='app.log', 
    filemode='a', 
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%d-%b-%y %H:%M:%S'
)

# 로거 생성
logger = logging.getLogger('my_logger')

# 로그 레벨 설정
logger.setLevel(logging.ERROR)

# 로그 핸들러 생성
handler = RotatingFileHandler('app.log', maxBytes=2000, backupCount=5)

# 핸들러 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# 로거에 핸들러 추가
logger.addHandler(handler)

try:
    with open('./lotto_data.xls', 'r', encoding='EUC-KR') as file:
        html_code = file.read()

    soup = BeautifulSoup(html_code, 'html.parser')
    table = soup.find_all('table')[1]  # 두 번째 테이블 선택
    rows = table.find_all('tr')

    data = []
    for row in rows[2:]:  # 첫 두 행은 제목이므로 무시합니다.
        cells = row.find_all('td')
        winning_numbers = [cell.text.strip() for cell in cells[-7:]]  # 당첨번호
        data.append(winning_numbers)

    df = pd.DataFrame(data, columns=['1번', '2번', '3번', '4번', '5번', '6번', '보너스'])

    data = np.array(df)
    n_steps = 5 

    # 모델 로드
    model = load_model('lotto_model.keras', compile=False)

    # 모델 컴파일
    model.compile(optimizer='adam', loss='mse')

    # 예측하기
    x_input = np.array([data[-n_steps:]], dtype=np.float32)

    print(x_input)
    x_input = x_input.reshape((1, n_steps, 7))

    predictions = []  # 예측 결과를 저장할 리스트

    # for i in range(5):  # 최대 5번의 예측 수행
    #     yhat = model.predict(x_input, verbose=0)
    #     yhat_rounded = [math.floor(x) for x in yhat[0]]
    #     predictions.append(yhat_rounded)

    #     # 다음 입력 준비
    #     x_input = np.array([yhat_rounded], dtype=np.float32)
    #     x_input = x_input.reshape((1, 1, 7))

    # for prediction in predictions:
    #     print(prediction)

except Exception as e:
    logging.error("Exception occurred", exc_info=True)