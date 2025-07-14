import { Button } from '@/components/ui/button';
import Header from '@/components/ui/custom/Header';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../service/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState(null); // ✅ fixed this line
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log('Fetched Resume Info:', resp.data.data);
      setResumeInfo(resp.data.data);
    })
  }

  const HandleDownload=()=>{
    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print" > 
      <Header title='View Resume' />
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <h2 className='text-center text-2xl font-semibold'>
          Congratulations! Your AI-Powered Resume is Ready to Shine!
        </h2>

        <p className='text-center text-gray-400'>
          Your resume is ready for download! You can now share your unique URL with friends and family,
          or proudly showcase it on social media.
        </p>

        <div className='flex justify-between px-44 my-10'>
          <Button onClick={HandleDownload}>Download</Button>
          <RWebShare
        data={{
          text: "Hello Everyone! This is my resume please open the URL to see it.",
          url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
          title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume", 
        }}
        onClick={() => console.log("shared successfully!")}
      >
       <Button>Share</Button>
      </RWebShare>
        
        </div>
       
      </div>
      
        
      </div>
        <div id="print-area" className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <ResumePreview />
        </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
