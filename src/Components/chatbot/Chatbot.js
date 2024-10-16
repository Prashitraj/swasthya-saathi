// src/components/Chatbot.js
import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './Chatbot.css';

const predefinedResponses = {
  "what are the symptoms of hypertensive  disease?" :"The following are the symptoms of hypertensive  disease: pain  chest, shortness  of breath, dizziness, asthenia, fall, syncope, vertigo, sweating  increased, palpitation, nausea, angina  pectoris, pressure  chest" ,
"i am having the following symptoms: pain  chest, shortness  of breath, dizziness, asthenia, fall, syncope, vertigo, sweating  increased, palpitation, nausea, angina  pectoris, pressure  chest. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hypertensive  disease." ,
"what are the symptoms of diabetes?" :"The following are the symptoms of diabetes: polyuria, polydypsia, shortness  of breath, pain  chest, asthenia, nausea, orthopnea, rale, sweating  increased, unresponsiveness, mental  status changes, vertigo, vomiting, labored breathing" ,
"i am having the following symptoms: polyuria, polydypsia, shortness  of breath, pain  chest, asthenia, nausea, orthopnea, rale, sweating  increased, unresponsiveness, mental  status changes, vertigo, vomiting, labored breathing. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with diabetes." ,
"what are the symptoms of depressive disorder?" :"The following are the symptoms of depressive disorder: feeling  suicidal, suicidal, hallucinations  auditory, feeling  hopeless, weepiness, sleeplessness, motor  retardation, irritable  mood, blackout, mood  depressed, hallucinations  visual, worry, agitation, tremor, intoxication, verbal  auditory hallucinations, energy  increased, difficulty, nightmare, unable  to concentrate, homelessness" ,
"i am having the following symptoms: feeling  suicidal, suicidal, hallucinations  auditory, feeling  hopeless, weepiness, sleeplessness, motor  retardation, irritable  mood, blackout, mood  depressed, hallucinations  visual, worry, agitation, tremor, intoxication, verbal  auditory hallucinations, energy  increased, difficulty, nightmare, unable  to concentrate, homelessness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with depressive disorder." ,
"what are the symptoms of coronary heart disease?" :"The following are the symptoms of coronary heart disease: pain  chest, angina  pectoris, shortness  of breath, hypokinesia, sweating  increased, pressure  chest, dyspnea  on exertion, orthopnea, chest  tightness" ,
"i am having the following symptoms: pain  chest, angina  pectoris, shortness  of breath, hypokinesia, sweating  increased, pressure  chest, dyspnea  on exertion, orthopnea, chest  tightness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with coronary heart disease." ,
"what are the symptoms of pneumonia?" :"The following are the symptoms of pneumonia: cough, fever, decreased  translucency, shortness  of breath, rale, productive  cough, pleuritic  pain, yellow  sputum, breath  sounds decreased, chill, rhonchus, green  sputum, non-productive  cough, wheezing, haemoptysis, distress  respiratory, tachypnea, malaise, night  sweat" ,
"i am having the following symptoms: cough, fever, decreased  translucency, shortness  of breath, rale, productive  cough, pleuritic  pain, yellow  sputum, breath  sounds decreased, chill, rhonchus, green  sputum, non-productive  cough, wheezing, haemoptysis, distress  respiratory, tachypnea, malaise, night  sweat. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with pneumonia." ,
"what are the symptoms of failure  heart congestive?" :"The following are the symptoms of failure  heart congestive: shortness  of breath, orthopnea, jugular  venous distention, rale, dyspnea, cough, wheezing" ,
"i am having the following symptoms: shortness  of breath, orthopnea, jugular  venous distention, rale, dyspnea, cough, wheezing. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with failure  heart congestive." ,
"what are the symptoms of accident  cerebrovascular?" :"The following are the symptoms of accident  cerebrovascular: dysarthria, asthenia, speech  slurred, facial  paresis, hemiplegia, unresponsiveness, seizure, numbness" ,
"i am having the following symptoms: dysarthria, asthenia, speech  slurred, facial  paresis, hemiplegia, unresponsiveness, seizure, numbness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with accident  cerebrovascular." ,
"what are the symptoms of asthma?" :"The following are the symptoms of asthma: wheezing, cough, shortness  of breath, chest  tightness, non-productive  cough, pleuritic  pain, productive  cough, symptom  aggravating factors, distress  respiratory" ,
"i am having the following symptoms: wheezing, cough, shortness  of breath, chest  tightness, non-productive  cough, pleuritic  pain, productive  cough, symptom  aggravating factors, distress  respiratory. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with asthma." ,
"what are the symptoms of myocardial  infarction?" :"The following are the symptoms of myocardial  infarction: pain chest, st segment elevation, sweating increased, shortness of breath, st segment depression, hypokinesia, angina pectoris, pressure chest, t wave inverted, orthopnea, rale, chest tightness, presence of q wave, palpitation, dyspnea, chest discomfort, bradycardia, syncope" ,
"i am having the following symptoms: pain chest, st segment elevation, sweating increased, shortness of breath, st segment depression, hypokinesia, angina pectoris, pressure chest, t wave inverted, orthopnea, rale, chest tightness, presence of q wave, palpitation, dyspnea, chest discomfort, bradycardia, syncope. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with myocardial  infarction." ,
"what are the symptoms of hypercholesterolemia?" :"The following are the symptoms of hypercholesterolemia: pain, pain chest, sweating increased, nonsmoker, pressure chest, syncope, numbness, chest discomfort, shortness of breath, st segment depression, worry, t wave inverted, bradycardia, dyspnea" ,
"i am having the following symptoms: pain, pain chest, sweating increased, nonsmoker, pressure chest, syncope, numbness, chest discomfort, shortness of breath, st segment depression, worry, t wave inverted, bradycardia, dyspnea. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hypercholesterolemia." ,
"what are the symptoms of infection?" :"The following are the symptoms of infection: fever, erythema, decreased translucency, hepatosplenomegaly, chill, pruritus, diarrhea, abscess bacterial, swelling, pain, apyrexial, cough" ,
"i am having the following symptoms: fever, erythema, decreased translucency, hepatosplenomegaly, chill, pruritus, diarrhea, abscess bacterial, swelling, pain, apyrexial, cough. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with infection." ,
"what are the symptoms of infection  urinary tract?" :"The following are the symptoms of infection  urinary tract: fever, dysuria, hematuria, renal angle tenderness, lethargy, asthenia, hyponatremia, hemodynamically stable, distress respiratory, difficulty passing urine, mental status changes, consciousness clear" ,
"i am having the following symptoms: fever, dysuria, hematuria, renal angle tenderness, lethargy, asthenia, hyponatremia, hemodynamically stable, distress respiratory, difficulty passing urine, mental status changes, consciousness clear. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with infection  urinary tract." ,
"what are the symptoms of anemia?" :"The following are the symptoms of anemia: consciousness clear, chill, guaiac positive, monoclonal, ecchymosis, tumor cell invasion, haemorrhage, pallor, asthenia, fatigue, heme positive, pain back, orthostasis, hyponatremia, dizziness, shortness of breath, pain, rhonchus, arthralgia, swelling, transaminitis" ,
"i am having the following symptoms: consciousness clear, chill, guaiac positive, monoclonal, ecchymosis, tumor cell invasion, haemorrhage, pallor, asthenia, fatigue, heme positive, pain back, orthostasis, hyponatremia, dizziness, shortness of breath, pain, rhonchus, arthralgia, swelling, transaminitis. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with anemia." ,
"what are the symptoms of chronic  obstructive airway disease?" :"The following are the symptoms of chronic  obstructive airway disease: shortness of breath, wheezing, cough, dyspnea, distress respiratory, sputum purulent, hypoxemia, hypercapnia, patient non compliance, chest tightness" ,
"i am having the following symptoms: shortness of breath, wheezing, cough, dyspnea, distress respiratory, sputum purulent, hypoxemia, hypercapnia, patient non compliance, chest tightness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with chronic  obstructive airway disease." ,
"what are the symptoms of dementia?" :"The following are the symptoms of dementia: fever, fall, unresponsiveness, lethargy, agitation, ecchymosis, syncope, rale, unconscious state, cough, bedridden, pain, facial paresis, abdominal tenderness, rhonchus, unsteady gait, hallucinations auditory" ,
"i am having the following symptoms: fever, fall, unresponsiveness, lethargy, agitation, ecchymosis, syncope, rale, unconscious state, cough, bedridden, pain, facial paresis, abdominal tenderness, rhonchus, unsteady gait, hallucinations auditory. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with dementia." ,
"what are the symptoms of insufficiency  renal?" :"The following are the symptoms of insufficiency  renal: shortness of breath, hyperkalemia, orthopnea, rale, urgency of micturition, ascites, guaiac positive, asthenia, apyrexial, mental status changes, dyspnea, difficulty, diarrhea, hypotension, breath sounds decreased, swelling, hypokinesia" ,
"i am having the following symptoms: shortness of breath, hyperkalemia, orthopnea, rale, urgency of micturition, ascites, guaiac positive, asthenia, apyrexial, mental status changes, dyspnea, difficulty, diarrhea, hypotension, breath sounds decreased, swelling, hypokinesia. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with insufficiency  renal." ,
"what are the symptoms of confusion?" :"The following are the symptoms of confusion: seizure, enuresis, lethargy, speech slurred, fall, consciousness clear, mental status changes, asterixis, unconscious state, agitation, muscle twitch, asthenia, sleepy, dizziness, headache, dysarthria, lightheadedness, tremor, hyponatremia, unresponsiveness" ,
"i am having the following symptoms: seizure, enuresis, lethargy, speech slurred, fall, consciousness clear, mental status changes, asterixis, unconscious state, agitation, muscle twitch, asthenia, sleepy, dizziness, headache, dysarthria, lightheadedness, tremor, hyponatremia, unresponsiveness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with confusion." ,
"what are the symptoms of degenerative  polyarthritis?" :"The following are the symptoms of degenerative  polyarthritis: pain, food  intolerance, numbness  of hand, general  discomfort, drowsiness, asthenia, nonsmoker, non-productive  cough, polydypsia, stiffness, unsteady  gait" ,
"i am having the following symptoms: pain, food  intolerance, numbness  of hand, general  discomfort, drowsiness, asthenia, nonsmoker, non-productive  cough, polydypsia, stiffness, unsteady  gait. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with degenerative  polyarthritis." ,
"what are the symptoms of hypothyroidism?" :"The following are the symptoms of hypothyroidism: shortness of breath, prostatism, sleepy, hyponatremia, fall, unsteady gait, polyuria, hypotension, difficulty, syncope, nightmare, speech slurred, weight gain, asthenia, tired, agitation, mental status changes, motor retardation, vomiting, numbness, mass of body structure" ,
"i am having the following symptoms: shortness of breath, prostatism, sleepy, hyponatremia, fall, unsteady gait, polyuria, hypotension, difficulty, syncope, nightmare, speech slurred, weight gain, asthenia, tired, agitation, mental status changes, motor retardation, vomiting, numbness, mass of body structure. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hypothyroidism." ,
"what are the symptoms of anxiety  state?" :"The following are the symptoms of anxiety  state: worry, feeling suicidal, suicidal, sleeplessness, feeling hopeless, irritable mood, tremor, blackout, weepiness, has religious belief, nervousness, hallucinations visual, formication, difficulty, pain chest, patient non compliance, agitation, palpitation, hallucinations auditory, mood depressed, hot flush, pain, consciousness clear, nightmare" ,
"i am having the following symptoms: worry, feeling suicidal, suicidal, sleeplessness, feeling hopeless, irritable mood, tremor, blackout, weepiness, has religious belief, nervousness, hallucinations visual, formication, difficulty, pain chest, patient non compliance, agitation, palpitation, hallucinations auditory, mood depressed, hot flush, pain, consciousness clear, nightmare. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with anxiety  state." ,
"what are the symptoms of primary malignant neoplasm?" :"The following are the symptoms of primary malignant neoplasm: pain, mass of body structure, lesion, cushingoid habitus, emphysematous change, decreased body weight, ascites, hoarseness, thicken, hematuria" ,
"i am having the following symptoms: pain, mass of body structure, lesion, cushingoid habitus, emphysematous change, decreased body weight, ascites, hoarseness, thicken, hematuria. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with primary malignant neoplasm." ,
"what are the symptoms of hiv infections?" :"The following are the symptoms of hiv infections: fever, night sweat, spontaneous rupture of membranes, cough, , decreased body weight, chill, diarrhea, pleuritic pain, patient non compliance, tachypnea, productive cough, hypotonic, feeling suicidal" ,
"i am having the following symptoms: fever, night sweat, spontaneous rupture of membranes, cough, , decreased body weight, chill, diarrhea, pleuritic pain, patient non compliance, tachypnea, productive cough, hypotonic, feeling suicidal. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hiv infections." ,
"what are the symptoms of cellulitis?" :"The following are the symptoms of cellulitis: erythema, pain, swelling, redness, fever, abscess bacterial, patient non compliance, hypesthesia, hyperacusis, pruritus, pain chest, scratch marks, chill, sore to touch" ,
"i am having the following symptoms: erythema, pain, swelling, redness, fever, abscess bacterial, patient non compliance, hypesthesia, hyperacusis, pruritus, pain chest, scratch marks, chill, sore to touch. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with cellulitis." ,
"what are the symptoms of gastroesophageal  reflux disease?" :"The following are the symptoms of gastroesophageal  reflux disease: pain, pain chest, burning sensation, hyponatremia, satiety early, throbbing sensation quality, chest tightness, sensory discomfort, presence of q wave, nausea, general discomfort, constipation, palpitation, pain abdominal, heartburn, sweating increased, asthenia" ,
"i am having the following symptoms: pain, pain chest, burning sensation, hyponatremia, satiety early, throbbing sensation quality, chest tightness, sensory discomfort, presence of q wave, nausea, general discomfort, constipation, palpitation, pain abdominal, heartburn, sweating increased, asthenia. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with gastroesophageal  reflux disease." ,
"what are the symptoms of sepsis (invertebrate)?" :"The following are the symptoms of sepsis (invertebrate): fever, distress respiratory, hypotension, tachypnea, chill, lethargy, bradycardia, breech presentation, cyanosis, spontaneous rupture of membranes, haemorrhage, unresponsiveness, rale, apyrexial" ,
"i am having the following symptoms: fever, distress respiratory, hypotension, tachypnea, chill, lethargy, bradycardia, breech presentation, cyanosis, spontaneous rupture of membranes, haemorrhage, unresponsiveness, rale, apyrexial. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with sepsis (invertebrate)." ,
"what are the symptoms of deep  vein thrombosis?" :"The following are the symptoms of deep  vein thrombosis: swelling, pain, ecchymosis, shortness of breath, pain in lower limb, cardiomegaly, rale, erythema, hypotension, clonus, non-productive cough, redness" ,
"i am having the following symptoms: swelling, pain, ecchymosis, shortness of breath, pain in lower limb, cardiomegaly, rale, erythema, hypotension, clonus, non-productive cough, redness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with deep  vein thrombosis." ,
"what are the symptoms of dehydration?" :"The following are the symptoms of dehydration: diarrhea, vomiting, hypotension, nausea, lightheadedness, unwell, mental status changes, anorexia, asthenia, sensory discomfort, syncope, lethargy, dizziness, history  of - blackout" ,
"i am having the following symptoms: diarrhea, vomiting, hypotension, nausea, lightheadedness, unwell, mental status changes, anorexia, asthenia, sensory discomfort, syncope, lethargy, dizziness, history  of - blackout. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with dehydration." ,
"what are the symptoms of neoplasm?" :"The following are the symptoms of neoplasm: mass of body structure, lesion, pain chest, hematuria, tumor cell invasion, pain, anosmia, thicken, metastatic lesion, food intolerance, decreased body weight, night sweat, hemianopsia homonymous, satiety early, pain abdominal, headache" ,
"i am having the following symptoms: mass of body structure, lesion, pain chest, hematuria, tumor cell invasion, pain, anosmia, thicken, metastatic lesion, food intolerance, decreased body weight, night sweat, hemianopsia homonymous, satiety early, pain abdominal, headache. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with neoplasm." ,
"what are the symptoms of embolism  pulmonary?" :"The following are the symptoms of embolism  pulmonary: shortness of breath, hypoxemia, tachypnea, hematocrit decreased, pain chest, dyspnea, pleuritic pain, neck stiffness, yellow sputum, productive cough, cicatrisation, unresponsiveness, distress respiratory, wheezing, apyrexial, non-productive cough" ,
"i am having the following symptoms: shortness of breath, hypoxemia, tachypnea, hematocrit decreased, pain chest, dyspnea, pleuritic pain, neck stiffness, yellow sputum, productive cough, cicatrisation, unresponsiveness, distress respiratory, wheezing, apyrexial, non-productive cough. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with embolism  pulmonary." ,
"what are the symptoms of epilepsy?" :"The following are the symptoms of epilepsy: seizure, hypometabolism, aura, muscle twitch, drowsiness, tremor, unresponsiveness, hemiplegia, myoclonus, gurgle, sleepy, lethargy, wheelchair bound" ,
"i am having the following symptoms: seizure, hypometabolism, aura, muscle twitch, drowsiness, tremor, unresponsiveness, hemiplegia, myoclonus, gurgle, sleepy, lethargy, wheelchair bound. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with epilepsy." ,
"what are the symptoms of cardiomyopathy?" :"The following are the symptoms of cardiomyopathy: shortness of breath, orthopnea, hypokinesia, jugular venous distention, palpitation, pain chest, syncope, yellow sputum, rale, dyspnea, dyspnea on exertion, left atrial hypertrophy, fatigue, weight gain, patient non compliance" ,
"i am having the following symptoms: shortness of breath, orthopnea, hypokinesia, jugular venous distention, palpitation, pain chest, syncope, yellow sputum, rale, dyspnea, dyspnea on exertion, left atrial hypertrophy, fatigue, weight gain, patient non compliance. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with cardiomyopathy." ,
"what are the symptoms of chronic  kidney failure?" :"The following are the symptoms of chronic  kidney failure: vomiting, orthopnea, hyperkalemia, oliguria, jugular venous distention, nausea, shortness of breath, mental status changes, diarrhea, asthenia, chest tightness, malaise, chill, rale, fever, pleuritic pain, apyrexial, guaiac positive, swelling, catatonia, unresponsiveness, yellow sputum" ,
"i am having the following symptoms: vomiting, orthopnea, hyperkalemia, oliguria, jugular venous distention, nausea, shortness of breath, mental status changes, diarrhea, asthenia, chest tightness, malaise, chill, rale, fever, pleuritic pain, apyrexial, guaiac positive, swelling, catatonia, unresponsiveness, yellow sputum. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with chronic  kidney failure." ,
"what are the symptoms of carcinoma?" :"The following are the symptoms of carcinoma: mass of body structure, pain, lesion, tumor cell invasion, thicken, decreased body weight, hoarseness, general discomfort, metastatic lesion, non-productive cough, constipation, unhappy, paresthesia, gravida 0, diarrhea, sore to touch, heartburn, nausea, lung nodule" ,
"i am having the following symptoms: mass of body structure, pain, lesion, tumor cell invasion, thicken, decreased body weight, hoarseness, general discomfort, metastatic lesion, non-productive cough, constipation, unhappy, paresthesia, gravida 0, diarrhea, sore to touch, heartburn, nausea, lung nodule. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with carcinoma." ,
"what are the symptoms of hepatitis  c?" :"The following are the symptoms of hepatitis  C: ascites, distended abdomen, feeling suicidal, cough, ache, macerated skin, heavy feeling, hallucinations auditory, chill, asterixis, patient non compliance" ,
"i am having the following symptoms: ascites, distended abdomen, feeling suicidal, cough, ache, macerated skin, heavy feeling, hallucinations auditory, chill, asterixis, patient non compliance. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hepatitis  C." ,
"what are the symptoms of peripheral  vascular disease?" :"The following are the symptoms of peripheral  vascular disease: shortness of breath, rest pain, angina pectoris, unresponsiveness, hyperkalemia, sinus rhythm, labored breathing, dyspnea, sore to touch, anorexia, sleepy" ,
"i am having the following symptoms: shortness of breath, rest pain, angina pectoris, unresponsiveness, hyperkalemia, sinus rhythm, labored breathing, dyspnea, sore to touch, anorexia, sleepy. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with peripheral  vascular disease." ,
"what are the symptoms of psychotic  disorder?" :"The following are the symptoms of psychotic  disorder: suicidal, hallucinations auditory, feeling suicidal, hallucinations visual, motor retardation, blackout, verbal auditory hallucinations, feeling hopeless, irritable mood, agitation, tremor, catatonia, weepiness, homelessness, sleeplessness, withdraw, energy increased, intoxication, worry, behavior hyperactive, patient non compliance, mood depressed, terrify, nightmare, consciousness clear" ,
"i am having the following symptoms: suicidal, hallucinations auditory, feeling suicidal, hallucinations visual, motor retardation, blackout, verbal auditory hallucinations, feeling hopeless, irritable mood, agitation, tremor, catatonia, weepiness, homelessness, sleeplessness, withdraw, energy increased, intoxication, worry, behavior hyperactive, patient non compliance, mood depressed, terrify, nightmare, consciousness clear. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with psychotic  disorder." ,
"what are the symptoms of hyperlipidemia?" :"The following are the symptoms of hyperlipidemia: pain chest, angina pectoris, palpitation, presence of q wave, photopsia, sweating increased, chest discomfort, shortness of breath, giddy mood, hypokinesia, hemiplegia, dizziness" ,
"i am having the following symptoms: pain chest, angina pectoris, palpitation, presence of q wave, photopsia, sweating increased, chest discomfort, shortness of breath, giddy mood, hypokinesia, hemiplegia, dizziness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hyperlipidemia." ,
"what are the symptoms of bipolar  disorder?" :"The following are the symptoms of bipolar  disorder: feeling suicidal, energy increased, suicidal, irritable mood, agitation, has religious belief, disturbed family, hallucinations auditory, verbal auditory hallucinations, weepiness, behavior hyperactive, catatonia, feeling hopeless, worry, sleeplessness, hypersomnia, difficulty, hallucinations visual, hyperhidrosis disorder, mydriasis, extrapyramidal sign, loose associations, intoxication, motor retardation, homelessness, blackout, tremor, exhaustion" ,
"i am having the following symptoms: feeling suicidal, energy increased, suicidal, irritable mood, agitation, has religious belief, disturbed family, hallucinations auditory, verbal auditory hallucinations, weepiness, behavior hyperactive, catatonia, feeling hopeless, worry, sleeplessness, hypersomnia, difficulty, hallucinations visual, hyperhidrosis disorder, mydriasis, extrapyramidal sign, loose associations, intoxication, motor retardation, homelessness, blackout, tremor, exhaustion. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with bipolar  disorder." ,
"what are the symptoms of obesity?" :"The following are the symptoms of obesity: pain, catatonia, snore, pain chest, r wave feature, has religious belief, shortness of breath, tired, overweight, systolic murmur, mood depressed, ecchymosis" ,
"i am having the following symptoms: pain, catatonia, snore, pain chest, r wave feature, has religious belief, shortness of breath, tired, overweight, systolic murmur, mood depressed, ecchymosis. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with obesity." ,
"what are the symptoms of ischemia?" :"The following are the symptoms of ischemia: sleepy, pain chest, angina pectoris, pressure chest, chest discomfort, shortness of breath, dyspnea, sinus rhythm, bradycardia, sweating increased, rale, asymptomatic, anorexia" ,
"i am having the following symptoms: sleepy, pain chest, angina pectoris, pressure chest, chest discomfort, shortness of breath, dyspnea, sinus rhythm, bradycardia, sweating increased, rale, asymptomatic, anorexia. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with ischemia." ,
"what are the symptoms of cirrhosis?" :"The following are the symptoms of cirrhosis: ascites, fall, splenomegaly, pruritus, pain abdominal, tumor cell invasion, distended abdomen, lesion, hemodynamically stable, guaiac positive, sore to touch, bleeding of vagina" ,
"i am having the following symptoms: ascites, fall, splenomegaly, pruritus, pain abdominal, tumor cell invasion, distended abdomen, lesion, hemodynamically stable, guaiac positive, sore to touch, bleeding of vagina. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with cirrhosis." ,
"what are the symptoms of exanthema?" :"The following are the symptoms of exanthema: fever, pruritus, macule, lesion, redness, headache, apyrexial, arthralgia, swelling, erythema, photophobia, chill, scratch marks, pain, painful swallowing" ,
"i am having the following symptoms: fever, pruritus, macule, lesion, redness, headache, apyrexial, arthralgia, swelling, erythema, photophobia, chill, scratch marks, pain, painful swallowing. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with exanthema." ,
"what are the symptoms of benign  prostatic hypertrophy?" :"The following are the symptoms of benign  prostatic hypertrophy: mental status changes, cachexia, blackout, orthostasis, orthopnea, night sweat, distress respiratory, anorexia, dysarthria" ,
"i am having the following symptoms: mental status changes, cachexia, blackout, orthostasis, orthopnea, night sweat, distress respiratory, anorexia, dysarthria. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with benign  prostatic hypertrophy." ,
"what are the symptoms of kidney  failure acute?" :"The following are the symptoms of kidney  failure acute: hyperkalemia, hypotension, hypocalcemia result, oliguria, hemodynamically stable, asthenia, hypothermia, natural, diarrhea, haemorrhage, unresponsiveness" ,
"i am having the following symptoms: hyperkalemia, hypotension, hypocalcemia result, oliguria, hemodynamically stable, asthenia, hypothermia, natural, diarrhea, haemorrhage, unresponsiveness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with kidney  failure acute." ,
"what are the symptoms of mitral  valve insufficiency?" :"The following are the symptoms of mitral  valve insufficiency: shortness of breath, dyspnea on exertion, asymptomatic, hypokinesia, dyspnea, syncope, thicken, left atrial hypertrophy, palpitation, fatigue, vomiting, pain, cardiomegaly, chest discomfort" ,
"i am having the following symptoms: shortness of breath, dyspnea on exertion, asymptomatic, hypokinesia, dyspnea, syncope, thicken, left atrial hypertrophy, palpitation, fatigue, vomiting, pain, cardiomegaly, chest discomfort. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with mitral  valve insufficiency." ,
"what are the symptoms of arthritis?" :"The following are the symptoms of arthritis: pain, hemodynamically stable, sleeplessness, asthenia, syncope, swelling, atypia, general unsteadiness, shortness of breath, distended abdomen" ,
"i am having the following symptoms: pain, hemodynamically stable, sleeplessness, asthenia, syncope, swelling, atypia, general unsteadiness, shortness of breath, distended abdomen. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with arthritis." ,
"what are the symptoms of bronchitis?" :"The following are the symptoms of bronchitis: cough, wheezing, shortness of breath, chest tightness, fever, throat sore, productive cough, hepatosplenomegaly, night sweat, haemoptysis, labored breathing, snuffle, hacking cough, dyspnea, chill, stridor, decreased body weight" ,
"i am having the following symptoms: cough, wheezing, shortness of breath, chest tightness, fever, throat sore, productive cough, hepatosplenomegaly, night sweat, haemoptysis, labored breathing, snuffle, hacking cough, dyspnea, chill, stridor, decreased body weight. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with bronchitis." ,
"what are the symptoms of hemiparesis?" :"The following are the symptoms of hemiparesis: dysarthria, paresis, asthenia, aphagia, seizure, speech slurred, focal seizures, hemiplegia, abnormal sensation, unresponsiveness, stupor, sleepy, fremitus, Stahli's line, stinging sensation, paralyse, clonus, facial paresis" ,
"i am having the following symptoms: dysarthria, paresis, asthenia, aphagia, seizure, speech slurred, focal seizures, hemiplegia, abnormal sensation, unresponsiveness, stupor, sleepy, fremitus, stahli's line, stinging sensation, paralyse, clonus, facial paresis. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with hemiparesis." ,
"what are the symptoms of osteoporosis?" :"The following are the symptoms of osteoporosis: prostatism, fall, hirsutism, sniffle, distended  abdomen, vertigo, numbness  of hand, bradykinesia, pain, syncope, out  of breath, apyrexial, urge  incontinence, lightheadedness" ,
"i am having the following symptoms: prostatism, fall, hirsutism, sniffle, distended  abdomen, vertigo, numbness  of hand, bradykinesia, pain, syncope, out  of breath, apyrexial, urge  incontinence, lightheadedness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with osteoporosis." ,
"what are the symptoms of transient  ischemic attack?" :"The following are the symptoms of transient  ischemic attack: speech slurred, dysarthria, facial paresis, asthenia, neck stiffness, vertigo, numbness, lightheadedness, extrapyramidal sign, Stahli's line, vision blurred, headache, room spinning, syncope, difficulty, rambling speech, clumsiness" ,
"i am having the following symptoms: speech slurred, dysarthria, facial paresis, asthenia, neck stiffness, vertigo, numbness, lightheadedness, extrapyramidal sign, stahli's line, vision blurred, headache, room spinning, syncope, difficulty, rambling speech, clumsiness. what could be the disease ?" :"The symptoms listed indicates that the patient is dealing with transient  ischemic attack.",
"what are the symptoms of adenocarcinoma?" :"The following are the symptoms of adenocarcinoma: mass of body structure, lesion, decreased body weight, constipation, fremitus, decreased stool caliber, satiety early, hematochezia, egophony, pain, scar tissue, pain abdominal"
};

const defaultLocations = [
  {
      "hospitalName": "BOWRING AND LADY CURZON HOSPITALS",
      "address": "BENGALURU URBAN",
      "longitude": 77.6040572,
      "latitude": 12.982188,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nGenitourinary Surgery\n\nNeuro Surgery\n\nSurgical Oncology\n\nBurns,Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures\n\nCritical Care\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nCardiology\n\nNephrology\n\nNeurology\n\nChest diseases and respiratory medicine(Pulmonology)"
  },
  {
      "hospitalName": "NARAYANA HRUDAYALAYA LIMITED",
      "address": "BENGALURU URBAN",
      "longitude": 77.6954359,
      "latitude": 12.8094974,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nGenitourinary Surgery\n\nNeuro Surgery\n\nSurgical Oncology\n\nBurns,Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures\n\nCritical Care\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nCardiology\n\nNephrology\n\nNeurology\n\nChest diseases and respiratory medicine(Pulmonology)"
  },
  {
      "hospitalName": "SAGAR HOSPITALS",
      "address": "BENGALURU URBAN",
      "longitude": 77.5651177,
      "latitude": 12.9079517,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "VYDEHI HOSPITAL",
      "address": "BENGALURU URBAN",
      "longitude": 77.7294128,
      "latitude": 12.9756768,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "BMCRI SSH PMSSY",
      "address": "BENGALURU URBAN",
      "longitude": 77.5729655,
      "latitude": 12.9624491,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nCardio Thoracic Surgery\n\nBurns,Plastic & reconstructive Surgery\n\nPaediatric Cancer\n\nGeneral Medicine\n\nCardiology"
  },
  {
      "hospitalName": "GENERAL HOSPITAL KR PURAM",
      "address": "BENGALURU URBAN",
      "longitude": 77.6939042,
      "latitude": 13.008721,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "General Hospital Jayanagar",
      "address": "BENGALURU URBAN",
      "longitude": 77.5928642,
      "latitude": 12.9263331,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "COMMUNITY HEALTH CENTER AVALAHALLI",
      "address": "BENGALURU URBAN",
      "longitude": 77.7146563,
      "latitude": 13.0503197,
      "departments": "ENT\n\nOrthopaedics\n\nGeneral Medicine"
  },
  {
      "hospitalName": "CHC Chandrappa Cercle",
      "address": "BENGALURU URBAN",
      "longitude": 77.3898602,
      "latitude": 12.9459719,
      "departments": "General Medicine"
  },
  {
      "hospitalName": "General Hospital Anekal",
      "address": "BENGALURU URBAN",
      "longitude": 77.69562,
      "latitude": 12.709623,
      "departments": "General Medicine"
  },
  {
      "hospitalName": "AYURVAID HOSPITAL -RAMAMURTHY NAGAR",
      "address": "BENGALURU URBAN",
      "longitude": 77.665434598,
      "latitude": 13.015073661,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "M S RAMAIAH MEMORIAL HOSPITAL",
      "address": "BENGALURU URBAN",
      "longitude": 77.5703924,
      "latitude": 13.0282554,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nGenitourinary Surgery\n\nNeuro Surgery\n\nSurgical Oncology\n\nBurns, Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures\n\nCritical Care\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nCardiology\n\nNephrology\n\nNeurology\n\nChest diseases and respiratory medicine(Pulmonology)"
  },
  {
      "hospitalName": "Fortis Hospitals Limited",
      "address": "BENGALURU URBAN",
      "longitude": 77.5939992,
      "latitude": 12.900611,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nGenitourinary Surgery\n\nNeuro Surgery\n\nSurgical Oncology\n\nBurns,Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures\n\nCritical Care\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nCardiology\n\nNephrology\n\nNeurology\n\nChest diseases and respiratory medicine(Pulmonology)"
  },
  {
      "hospitalName": "Sakra World Hospital",
      "address": "BENGALURU URBAN",
      "longitude": 77.6851886,
      "latitude": 12.9323275,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "APOLLO HOSPITALS SHESHADRIPURAM",
      "address": "BENGALURU URBAN",
      "longitude": 77.5726879,
      "latitude": 12.9883022,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "P D HINDUJA SINDHI HOSPITAL",
      "address": "BENGALURU URBAN",
      "longitude": 77.594032,
      "latitude": 12.971773,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "PAN NAGARBHAVI HOSPITALS PVT LTD",
      "address": "BENGALURU URBAN",
      "longitude": 77.5204992,
      "latitude": 12.9611882,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine"
  },
  {
      "hospitalName": "IMPERIAL HOSPITAL AND RESEARCH CENTER LIMITED A UNIT OF APOLLO HOSPITAL",
      "address": "BENGALURU URBAN",
      "longitude": 77.5984218,
      "latitude": 12.8962841,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nGenitourinary Surgery\n\nNeuro Surgery\n\nSurgical Oncology\n\nBurns,Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures\n\nCritical Care\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nCardiology\n\nNephrology\n\nNeurology\n\nChest diseases and respiratory medicine(Pulmonology)"
  },
  {
      "hospitalName": "Aster CMI Hospital",
      "address": "BENGALURU URBAN",
      "longitude": 77.5963159,
      "latitude": 13.0464229,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nGenitourinary Surgery\n\nNeuro Surgery\n\nSurgical Oncology\n\nBurns,Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures\n\nCritical Care\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nCardiology\n\nNephrology\n\nNeurology\n\nChest diseases and respiratory medicine(Pulmonology)"
  },
  {
      "hospitalName": "FORTIS HOSPITAL CUNNINGHAM ROAD",
      "address": "BENGALURU URBAN",
      "longitude": 77.5943994,
      "latitude": 12.9883318,
      "departments": "General Surgery\n\nENT\n\nOphthalmology\n\nObstetrics & Gynaecology\n\nOrthopaedics\n\nPaediatric Cancer\n\nGeneral Medicine\n\nPaediatrics\n\nNeonatology\n\nBurns,Plastic & reconstructive Surgery\n\nPolytrauma\nTreatment Procedure Dental Procedures"
  }
];

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([{sender: "bot", text:"Hi how can I help you?"}]);

  const handleSend = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    const response = predefinedResponses[lowerCaseInput] || "Sorry, I don't understand that.";

    if(lowerCaseInput.includes("show map"))
    {
      setChatHistory([...chatHistory, { sender: "you", text: userInput }, { sender: "map", text: "Here's the location that you requested.", locations: defaultLocations }]);
    } 
    else 
    {
      setChatHistory([...chatHistory, { sender: "you", text: userInput }, { sender: "bot", text: response }]);
    }  
  };

  return (
    <div className="chatbot">
      <MessageList messages={chatHistory} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default Chatbot;
