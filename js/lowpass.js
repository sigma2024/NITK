//FLags to check which wave is selected:
sine_flag=0;
sqre_flag=0;
tri_flag=0;

//creation of three buuttons:
btn = document.createElement("button");
btn1 = document.createElement("button");
btn2 = document.createElement("button");
//------
//Text to be displayed iside the button
btn.innerHTML = "Sine Wave";
btn1.innerHTML = "Square Wave";
btn2.innerHTML = "triangular Wave";
//------------
//Adding the button at the end of the html file
document.body.appendChild(btn);
document.body.appendChild(btn1);
document.body.appendChild(btn2);
//----------

// this block will aget the input from the three different sliders
coff_freq = document.getElementById("cutoff-frequency");
in_freq   = document.getElementById("input-frequency");
in_amp    = document.getElementById("input-amplitude");
//---------------

//------------EVENTS-----------------
//-----------------ON CLICKING BUTTON----------------------------

//SINE wave:
btn.onclick=function()
 {
  var a = coff_freq.value;
  var b = in_freq.value;
  var c = in_amp.value;
  sine(a,b,c);
  sine_flag=1;
  sqre_flag=0;
  tri_flag=0;
 }
//square wave:
btn1.onclick=function()
{
  var a = coff_freq.value*10;
  var b = in_freq.value*10;
  var c =(in_amp.value/10);
  sqre(a,b,c);
  sine_flag=0;
  sqre_flag=1;
  tri_flag=0;
}
//triangle Wave:
btn2.onclick=function()
{
  var a = coff_freq.value*10;
  var b = in_freq.value*10;
  var c =(in_amp.value/10);
  tri(a,b,c);
  sine_flag=0;
  sqre_flag=0;
  tri_flag=1;
}
 //--------------END OF ON CLICKING BUTTON------------------------



//-------------ON SLIDING(.oninput)-------------------------

//cutoff_frequency slider input event check:
coff_freq.oninput=function()
{
  pplot();
}
//input frequency slider input event checking:
in_freq.oninput=function()
{
  pplot();
}
//input amplitude slider input event checking:
in_amp.oninput=function()
{
  pplot();
}

//function to plot
function pplot()
{
  if(sine_flag==1)
  {
    var a = coff_freq.value;
  var b = in_freq.value;
  var c = in_amp.value;
  sine(a,b,c);
  sine_flag=1;
  sqre_flag=0;
  tri_flag=0;
  }
  if(sqre_flag==1)
  {
    var a = coff_freq.value*10;
  var b = in_freq.value*10;
  var c =(in_amp.value/10);
  sqre(a,b,c);
  sine_flag=0;
  sqre_flag=1;
  tri_flag=0;

  }
  if(tri_flag==1)
  {
    var a = coff_freq.value*10;
    var b = in_freq.value*10;
    var c =(in_amp.value/10);
    tri(a,b,c);
    sine_flag=0;
    sqre_flag=0;
    tri_flag=1;
  }
}



//--------------END OF SLIDING------------------------------




//this block assign the input value to the display elements
out_coff_freq = document.getElementById("cutoff-value");
out_in_freq   = document.getElementById("input-frequency-value");
out_in_amp    = document.getElementById("input-amplitude-value");
// // displaying the elements
out_coff_freq.innerHTML  = coff_freq.value;
out_in_freq.innerHTML    = in_freq.value;
out_in_amp.innerHTML     =in_amp.value; 


     
//--------------------------------------START OF SINE WAVE---------------------------------------------------------    
    function sine(cutoffFrequency,frequency,amplitude) {
      //alert("Button is clicked");
      // Define the input sinewave parameters
        // const frequency = 10;  // Frequency of the sinewave (in Hz)***************************
        
        // const amplitude = 5;  // Amplitude of the sinewave**************************************
        const samplingRate = 1000;  // Sampling rate (in samples per second)
        const duration = 1;  // Duration of the signal (in seconds)
        const numSamples = samplingRate * duration;
    const max=1;
    const min=-1;
        // Generate the input sinewave
        const inputSignal = new Array(numSamples).fill(0).map((_, i) => {
          const time = i / samplingRate;
          return amplitude * Math.sin(2 * Math.PI * frequency * time+(Math.random()*(max-min+1)+min));
        });
    
        // Define the low-pass filter parameters
        // const cutoffFrequency = 20;  // Cutoff frequency of the filter (in Hz)********************
    
        // Apply the low-pass filter
        let filteredSignal = [];
        inputSignal.forEach((_, i) => {
          if (i === 0) {
            filteredSignal.push(inputSignal[0]); // No filter applied to the first sample
          } else {
            const cutoff = (2 * Math.PI * cutoffFrequency) / samplingRate;
            const alpha = Math.exp(-cutoff);
            filteredSignal.push((1 - alpha) * inputSignal[i] + alpha * filteredSignal[i - 1]);
          }
        });
    
        // Create the plot
        const trace1 = {
          x: Array.from({ length: numSamples }, (_, i) => i / samplingRate),
          y: inputSignal,
          mode: 'lines',
          name: 'Input Signal'
        };
    
        const trace2 = {
          x: Array.from({ length: numSamples }, (_, i) => i / samplingRate),
          y: filteredSignal,
          mode: 'lines',
          name: 'Filtered Signal'
        };
    
        const data = [trace1, trace2];
    
        const layout = {
          title: 'Low-Pass Filter Example',
          xaxis: { title: 'Time (s)' },
          yaxis: { title: 'Amplitude' }
        };
    
        Plotly.newPlot('chart', data, layout);
    
    };



//----------------------------END OF SINE WAVE---------------------------------------


//----------------SQUARE WAVE---------------------------------------
        function sqre(cutoffFrequency,frequency,amplitude) { // Function to generate a squ0are wave
        function generateSquareWave(frequency, duration, samplingRate,amplitude) {
          // const amplitude=5;//***************************** */
          const samples = amplitude*Math.floor(duration * samplingRate);
          // console.log(amplitude)
          const period = samplingRate / frequency;
          const data = new Array(samples);
    
          for (let i = 0; i < samples; i++) {
            const t = i % period;
            data[i] = t < period / 2 ? 1 : -1;
          }
    
          return data;
        }
    
        // Function to generate random noise
        function generateNoise(amplitude, length) {
          const noise = new Array(length);
    
          for (let i = 0; i < length; i++) {
            noise[i] = (Math.random() * 2 - 1) * amplitude;
          }
    
          return noise;
        }
    
        // Function to apply a lowpass filter
        function applyLowpassFilter(data, cutoffFrequency, samplingRate) {
          const RC = 1 / (2 * Math.PI * cutoffFrequency);
          const dt = 1 / samplingRate;
          const alpha = RC / (RC + dt);
          const filteredData = new Array(data.length);
    
          let filteredValue = 0;
    
          for (let i = 0; i < data.length; i++) {
            filteredValue = (alpha * data[i]) + ((1 - alpha) * filteredValue);
            filteredData[i] = filteredValue;
          }
    
          return filteredData;
        }
    
        // Generate the input square wave
        // const frequency = 1000; // Frequency of the square wave (Hz)
        const duration = 1/frequency; // Duration of the square wave (seconds)
        const samplingRate = 48000; // Sampling rate (Hz)
        const inputData = generateSquareWave(frequency, duration, samplingRate,amplitude);
    
        // Generate random noise
        // const noiseAmplitude = 0.2; // Amplitude of the noise*******************
        const noiseAmplitude = amplitude/10;
        const noiseLength = inputData.length; // Length of the noise array
        const noise = generateNoise(noiseAmplitude, noiseLength);
    
        // Add noise to the input data
        const inputDataWithNoise = inputData.map((value, index) => value + noise[index]);
    
        // Apply lowpass filter
        // const cutoffFrequency = 1200; // Cutoff frequency of the filter (Hz)
        const filteredData = applyLowpassFilter(inputDataWithNoise, cutoffFrequency, samplingRate);
    
        // Create data arrays for the plot
        const traceInput = {
          x: inputDataWithNoise.map((_, i) => i / samplingRate),
          y: inputDataWithNoise,
          name: 'Input Square Wave with Noise',
        };
    
        const traceOutput = {
          x: filteredData.map((_, i) => i / samplingRate),
          y: filteredData,
          name: 'Filtered Output',
        };
    
        // Create the plot layout
        const layout = {
          title: 'Lowpass Filter Response',
          xaxis: { title: 'Time (s)' },
          yaxis: { title: 'Amplitude' },
        };
    
        // Create the plot data
        const data = [traceInput, traceOutput];
    
        // Generate the plot
        Plotly.newPlot('chart', data, layout);
      
      };

//---------------END OF SQUARE WAVE--------------------------------------



//----------------TRIANGULAR WAVE------------------------------------
    function tri (cutoffFrequency,frequency,amplitude) {// Function to generate a triangular wave
        function generateTriangularWave(frequency, duration, samplingRate,amplitude) {
          // console.log(frequency);
          const samples = Math.floor(duration * samplingRate);//add the amplitude****************
          const period = samplingRate / frequency;
          const data = new Array(samples);
    
          for (let i = 0; i < samples; i++) {
            const t = (i % period) / period;
            data[i] = (t < 0.5) ? (4 * t - 1) : (-4 * t + 3);
            data[i]*=amplitude;
          }
    
          return data;
        }
    
        // Function to generate random noise
        function generateNoise(amplitude, length) {
          const noise = new Array(length);
    
          for (let i = 0; i < length; i++) {
            noise[i] = (Math.random() * 2 - 1) * amplitude;
          }
    
          return noise;
        }
    
        // Function to apply a lowpass filter
        function applyLowpassFilter(data, cutoffFrequency, samplingRate) {
          const RC = 1 / (2 * Math.PI * cutoffFrequency);
          const dt = 1 / samplingRate;
          const alpha = RC / (RC + dt);
          const filteredData = new Array(data.length);
    
          let filteredValue = 0;
    
          for (let i = 0; i < data.length; i++) {
            filteredValue = (alpha * data[i]) + ((1 - alpha) * filteredValue);
            filteredData[i] = filteredValue;
          }
    
          return filteredData;
        }
    
        // Generate the input triangular wave
        // const frequency = 500; // Frequency of the triangular wave (Hz)
        const duration = 0.02; // Duration of the triangular wave (seconds)
        const samplingRate = 48000; // Sampling rate (Hz)
        const inputData = generateTriangularWave(frequency, duration, samplingRate,amplitude);
    
        // Generate random noise
        const noiseAmplitude = 0.2; // Amplitude of the noise
        const noiseLength = inputData.length; // Length of the noise array
        const noise = generateNoise(noiseAmplitude, noiseLength);
    
        // Add noise to the input data
        const inputDataWithNoise = inputData.map((value, index) => value + noise[index]);
    
        // Apply lowpass filter
        // const cutoffFrequency = 1200; // Cutoff frequency of the filter (Hz)
        const filteredData = applyLowpassFilter(inputDataWithNoise, cutoffFrequency, samplingRate);
    
        // Create data arrays for the plot
        const traceInput = {
          x: inputDataWithNoise.map((_, i) => i / samplingRate),
          y: inputDataWithNoise,
          name: 'Input Triangular Wave with Noise',
        };
    
        const traceOutput = {
          x: filteredData.map((_, i) => i / samplingRate),
          y: filteredData,
          name: 'Filtered Output',
        };
    
        // Create the plot layout
        const layout = {
          title: 'Lowpass Filter Response',
          xaxis: { title: 'Time (s)' },
          yaxis: { title: 'Amplitude' },
        };
    
        // Create the plot data
        const data = [traceInput, traceOutput];
    
        // Generate the plot
        Plotly.newPlot('chart', data, layout);
      };
// -----------------END OF TRIANGLE WAVE---------------------------------