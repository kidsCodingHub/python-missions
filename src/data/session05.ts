import type { Session } from '../types';

const session: Session = {
  id: '05',
  number: 5,
  titleAr: 'صح أم خطأ؟',
  titleEn: 'True or False',
  badgeName: 'Logic Thinker',
  badgeColor: '#27C93F',
  badgeIcon: 'Brain',
  description: 'تعلّم القيم المنطقية bool وعمليات المقارنة وand/or/not، بدون استخدام if/else.',
  learningGoals: [
    'أستخدم عمليات المقارنة == != > < >= <=',
    'أفرّق بين = و ==',
    'أدمج الشروط بـ and / or / not',
    'أطبع نتائج Boolean بدون if/else'
  ],
  missions: [
    {
      id: 'm01',
      order: 1,
      title: 'Retrieval Arena: مراجعة Strings',
      type: 'multiple-choice',
      goal: 'مراجعة النصوص والأنواع.',
      question: 'ما ناتج "Hi" * 2؟',
      choices: [
        { id: 'a', text: 'HiHi', explanation: 'صحيح.' },
        { id: 'b', text: 'Hi Hi', explanation: 'خطأ.' },
        { id: 'c', text: 'TypeError', explanation: 'خطأ.' },
        { id: 'd', text: 'H2i', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: '* يردد النص.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '"Hi" * 2 = "HiHi".', nextStep: 'اختر HiHi.' },
        a: { correct: true, what: 'صحيح', why: 'التكرار يلصق النص.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm02',
      order: 2,
      title: 'Predict: 7 > 3',
      type: 'predict-output',
      goal: 'توقع ناتج مقارنة.',
      primmTag: 'Predict',
      question: 'ما ناتج print(7 > 3)؟',
      predictCode: 'print(7 > 3)',
      expectedOutput: 'True',
      hints: [{ text: 'الناتج قيمة منطقية.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '7 > 3 صحيحة، لذا True.', nextStep: 'اكتب True.' },
        success: { correct: true, what: 'صحيح', why: 'المقارنة صحيحة فتعطي True.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm03',
      order: 3,
      title: 'Run & Investigate: bool',
      type: 'run-compare',
      goal: 'تأكيد أن الناتج من نوع bool.',
      question: 'شغّل: print(type(5 == 5))',
      predictCode: 'print(type(5 == 5))',
      expectedOutput: "<class 'bool'>",
      hints: [{ text: 'type() يعطي نوع القيمة.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '5 == 5 = True، وtype(True) = bool.', nextStep: 'اكتب <class \'bool\'>.' },
        success: { correct: true, what: 'صحيح', why: 'نتيجة المقارنة bool.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm04',
      order: 4,
      title: 'جدول المقارنات',
      type: 'multi-select',
      goal: 'فهم عمليات المقارنة.',
      explanation: '== يساوي، != لا يساوي، > أكبر، < أصغر، >= أكبر أو يساوي، <= أصغر أو يساوي.',
      question: 'أيُّ التعبيرات التالية تعطي True؟',
      choices: [
        { id: 'a', text: '5 == 5', explanation: 'صحيح.' },
        { id: 'b', text: '5 != 5', explanation: 'خطأ.' },
        { id: 'c', text: '3 < 7', explanation: 'صحيح.' },
        { id: 'd', text: '10 <= 9', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a', 'c'],
      hints: [{ text: 'فكّر في معنى كل رمز.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '5==5 صحيحة و3<7 صحيحة.', nextStep: 'اختر التعبيرات الصحيحة فقط.' },
        success: { correct: true, what: 'صحيح', why: '== للتساوي و < للأصغر من.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm05',
      order: 5,
      title: '= vs ==',
      type: 'true-false-fix',
      goal: 'التفرقة بين الإسناد والمقارنة.',
      question: 'حدّد الاستخدام الصحيح:',
      choices: [
        { id: 'a', text: 'x = 5  # تعيين قيمة', correct: true, explanation: 'صحيح: = إسناد.' },
        { id: 'b', text: 'x == 5  # مقارنة', correct: true, explanation: 'صحيح: == مقارنة.' },
        { id: 'c', text: 'if x = 5:  # مقارنة', correct: false, explanation: 'خطأ: داخل شرط يجب استخدام ==.' },
        { id: 'd', text: 'print(x = 5)  # طباعة القيمة 5', correct: false, explanation: 'خطأ: = داخل print لا تعني مقارنة.' }
      ],
      correctChoiceIds: ['a', 'b'],
      hints: [{ text: '= تعطي قيمة، == تسأل هل متساويان.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '= تُستخدم للإسناد فقط، == للمقارنة.', nextStep: 'اختر الجمل التي تستخدم الرمزين بشكل صحيح.' },
        success: { correct: true, what: 'صحيح', why: 'ميّزتَ بين الإسناد والمقارنة.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm06',
      order: 6,
      title: 'Concept: النوع bool',
      type: 'multiple-choice',
      goal: 'فهم True/False كنوع بيانات.',
      question: 'أيُّ الكتابات تمثل قيمة bool صحيحة في Python؟',
      choices: [
        { id: 'a', text: 'true', explanation: 'خطأ: الحرف الأول صغير.' },
        { id: 'b', text: 'True', explanation: 'صحيح.' },
        { id: 'c', text: 'FALSE', explanation: 'خطأ: Python حساسة لحالة الأحرف.' },
        { id: 'd', text: 'false', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'في Python True وFalse بحرف كبير.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'True وFalse يجب أن تبدأ بحرف كبير.', nextStep: 'اختر True.' },
        b: { correct: true, what: 'صحيح', why: 'Python تتطلب True/False بحرف كبير.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm07',
      order: 7,
      title: 'Predict + Practice: and',
      type: 'predict-output',
      goal: 'فهم and.',
      question: 'ما ناتج print(True and False)؟',
      predictCode: 'print(True and False)',
      expectedOutput: 'False',
      hints: [{ text: 'and يعطي True فقط إذا كان الشرطان True.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'and يحتاج كليهما True، هنا أحدهما False.', nextStep: 'اكتب False.' },
        success: { correct: true, what: 'صحيح', why: 'and يعطي True فقط عند تحقق الشرطين معًا.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm08',
      order: 8,
      title: 'Guided Practice: or و not',
      type: 'multiple-choice',
      goal: 'فهم or و not.',
      question: 'ما ناتج print(not True or False)؟',
      choices: [
        { id: 'a', text: 'True', explanation: 'خطأ: not True = False.' },
        { id: 'b', text: 'False', explanation: 'صحيح: not True = False، ثم False or False = False.' },
        { id: 'c', text: 'Error', explanation: 'خطأ.' },
        { id: 'd', text: 'None', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'not يعكس القيمة.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'not True = False، ثم False or False = False.', nextStep: 'اختر False.' },
        b: { correct: true, what: 'صحيح', why: 'not يعكس القيمة، وor يحتاج واحدًا True على الأقل.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm09',
      order: 9,
      title: 'Mixed Boolean Challenge',
      type: 'predict-output',
      goal: 'دمج عمليات منطقية.',
      question: 'ما ناتج print(5 > 3 and 2 < 4)؟',
      predictCode: 'print(5 > 3 and 2 < 4)',
      expectedOutput: 'True',
      hints: [{ text: '5 > 3 صحيحة و 2 < 4 صحيحة.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'الشرطان صحيحان، لذا and يعطي True.', nextStep: 'اكتب True.' },
        success: { correct: true, what: 'صحيح', why: 'and يعطي True عندما يكون الشرطان صحيحين.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm10',
      order: 10,
      title: 'Match: تعبيرات ونتائج',
      type: 'match-pairs',
      goal: 'مطابقة التعبيرات بنتائجها.',
      question: 'اطبق كل تعبير بناتجه:',
      pairs: [
        { id: 'p1', left: '4 == 4', right: 'True' },
        { id: 'p2', left: '4 != 4', right: 'False' },
        { id: 'p3', left: 'True and False', right: 'False' },
        { id: 'p4', left: 'not False', right: 'True' }
      ],
      hints: [{ text: '!= تعني "لا يساوي".' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'راجع معنى كل عملية.', nextStep: 'اطبق التعبير بناتجه الصحيح.' },
        success: { correct: true, what: 'صحيح', why: 'مطابقة جميع التعبيرات صحيحة.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm11',
      order: 11,
      title: 'Make Project: Eligibility Checker',
      type: 'mini-project',
      goal: 'بناء مدقق أهلية بدون if/else.',
      explanation: 'استخدم Boolean expressions مباشرة.',
      question: 'اكتب برنامجك:',
      codeInput: 'age = int(input("Age: "))\navailable_time = int(input("Available hours: "))\nage_rule = age >= 15\ntime_rule = available_time >= 2\nis_eligible = age_rule and time_rule\nprint("Age rule:", age_rule)\nprint("Time rule:", time_rule)\nprint("Eligible:", is_eligible)',
      expectedOutput: '',
      hints: [{ text: 'لا تستخدم if/else.' }, { text: 'استخدم and لدمج الشرطين.' }],
      feedback: {
        default: { correct: false, what: 'المشروع غير مكتمل.', why: 'يجب حساب القواعد Boolean وطباعتها بدون if/else.', nextStep: 'استخدم and مع الشرطين واطبع النتائج.' },
        success: { correct: true, what: 'ممتاز!', why: 'طبعتَ Boolean expressions مباشرة بدون تفريع.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm12',
      order: 12,
      title: 'Boss Challenge: Logic Thinker',
      type: 'multiple-choice',
      goal: 'مراجعة Boolean.',
      question: 'ما ناتج print(True or False and False)؟',
      choices: [
        { id: 'a', text: 'True', explanation: 'صحيح: and أولًا → False، ثم True or False = True.' },
        { id: 'b', text: 'False', explanation: 'خطأ.' },
        { id: 'c', text: 'Error', explanation: 'خطأ.' },
        { id: 'd', text: 'None', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: 'and أولوية أعلى من or.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'and ينفذ أولًا: False and False = False، ثم True or False = True.', nextStep: 'اختر True.' },
        a: { correct: true, what: 'صحيح', why: 'and أولوية أعلى من or.', nextStep: 'التقرير.' }
      }
    }
  ],
  project: {
    title: 'School Activity Eligibility Checker',
    description: 'يتحقق من أهلية الطالب لنشاط مدرسي بناءً على العمر والوقت المتاح، بدون استخدام if/else.',
    requirement: 'طباعة نتائج Boolean مباشرة فقط: age_rule, time_rule, is_eligible.',
    inputProcessOutput: {
      input: 'age, available_time',
      process: 'age_rule = age >= 15; time_rule = available_time >= 2; is_eligible = age_rule and time_rule',
      output: 'طباعة الثلاث قيم Boolean'
    },
    starterCode: '# Eligibility Checker\nage = int(input("Age: "))\navailable_time = int(input("Available hours: "))\n\nage_rule = age >= 15\ntime_rule = available_time >= 2\nis_eligible = age_rule and time_rule\n\nprint("Age rule:", age_rule)\nprint("Time rule:", time_rule)\nprint("Eligible:", is_eligible)',
    testCases: [
      { id: 't1', inputs: ['16', '3'], expectedOutput: 'Eligible: True' },
      { id: 't2', inputs: ['14', '3'], expectedOutput: 'Eligible: False' },
      { id: 't3', inputs: ['16', '1'], expectedOutput: 'Eligible: False' },
      { id: 't4', inputs: ['15', '2'], expectedOutput: 'Eligible: True' },
      { id: 't5', inputs: ['15', '1'], expectedOutput: 'Eligible: False' }
    ],
    successCriteria: [
      'لا يستخدم if/else',
      'يحسب age_rule و time_rule و is_eligible',
      'يطبع القيم الثلاث بوضوح'
    ],
    hints: [
      { text: 'استخدم and لدمج الشرطين.' },
      { text: 'تذكر: لا if/else في هذه الحصة.' }
    ]
  },
  bossRounds: [
    {
      id: 'b1',
      title: 'مقارنة',
      type: 'predict-output',
      question: 'ما ناتج print(8 >= 8)؟',
      predictCode: 'print(8 >= 8)',
      expectedOutput: 'True',
      hints: [{ text: '>= يعني أكبر أو يساوي.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '8 يساوي 8.', nextStep: 'اكتب True.' }, success: { correct: true, what: 'صحيح', why: '>= يسمح بالتساوي.', nextStep: 'التالي.' } }
    },
    {
      id: 'b2',
      title: '= vs ==',
      type: 'multiple-choice',
      question: 'أيُّ الرموز يُستخدم للمقارنة؟',
      choices: [
        { id: 'a', text: '=', explanation: 'خطأ: إسناد.' },
        { id: 'b', text: '==', explanation: 'صحيح: مقارنة.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'المقارنة رمزان =.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '== للمقارنة.', nextStep: 'اختر ==.' }, b: { correct: true, what: 'صحيح', why: '== يسأل هل المتساويان.', nextStep: 'التالي.' } }
    },
    {
      id: 'b3',
      title: 'and',
      type: 'predict-output',
      question: 'ما ناتج print(True and True)؟',
      predictCode: 'print(True and True)',
      expectedOutput: 'True',
      hints: [{ text: 'and يحتاج كليهما True.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'كلاهما True.', nextStep: 'اكتب True.' }, success: { correct: true, what: 'صحيح', why: 'and True عندما كلاهما صحيح.', nextStep: 'التالي.' } }
    },
    {
      id: 'b4',
      title: 'or',
      type: 'predict-output',
      question: 'ما ناتج print(False or True)؟',
      predictCode: 'print(False or True)',
      expectedOutput: 'True',
      hints: [{ text: 'or يكفي واحد True.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'or يكفي True واحدة.', nextStep: 'اكتب True.' }, success: { correct: true, what: 'صحيح', why: 'or يعطي True لو شرط واحد صحيح.', nextStep: 'التالي.' } }
    },
    {
      id: 'b5',
      title: 'not',
      type: 'predict-output',
      question: 'ما ناتج print(not (5 == 5))؟',
      predictCode: 'print(not (5 == 5))',
      expectedOutput: 'False',
      hints: [{ text: '5 == 5 = True، not يعكس.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '5==5 True، not True = False.', nextStep: 'اكتب False.' }, success: { correct: true, what: 'صحيح', why: 'not يعكس القيمة.', nextStep: 'انتهى.' } }
    }
  ]
};

export default session;
