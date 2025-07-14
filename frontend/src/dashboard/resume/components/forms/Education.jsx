import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Education() {
  const [loading, setLoading] = useState(false);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([{
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  }])

  useEffect(() => {
    resumeInfo?.education.length > 0 && setEducationalList(resumeInfo?.education)
  }, [])

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);

  }

  const addEducation = () => {
    setEducationalList([...educationalList,
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }])
  }

  const RemoveEducation = () => {
    setEducationalList(educationalList => educationalList.slice(0, -1));
  }

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }
      GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
        console.log(resp);
        setLoading(false);
        toast('Details updated !');
      }, (error) => {
        setLoading(false);
        toast.error('Server Error, Please try again later');
      })
    
    }
  useEffect(() => { 
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    })

  },[educationalList])


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your education details</p>


      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input name="universityName" onChange={(e) => handleChange(e, index)} defaultValue={item?.universityName} />
              </div>
              <div>
                <label>Degree</label>
                <Input name="degree" onChange={(e) => handleChange(e, index)} defaultValue={item?.degree} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major" onChange={(e) => handleChange(e, index)} defaultValue={item?.major} />
              </div>
              <div>
                <label>Start Date</label>
                <Input type="date" name="startDate" onChange={(e) => handleChange(e, index)} defaultValue={item?.startDate} />
              </div>
              <div>
                <label>End Date</label>
                <Input type="date" name="endDate" onChange={(e) => handleChange(e, index)} defaultValue={item?.endDate} />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea name="description" onChange={(e) => handleChange(e, index)} defaultValue={item?.description} />
              </div>

            </div>

          </div>
        ))}
      </div>
      <div className='flex justify-between mt-4'>
        <div className='flex gap-2'>
          <Button variant="outline" className="text-primary" onClick={addEducation}>
            + Add More Education</Button>
          <Button variant="outline" className="text-primary" onClick={RemoveEducation}> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Education