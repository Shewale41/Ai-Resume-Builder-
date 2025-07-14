import React, { useEffect, useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { use } from 'react';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
};

function Experience() {
    const params = useParams();
    const [experienceList, setExperienceList] = useState([formField]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        resumeInfo?.experience?.length>0 && setExperienceList(resumeInfo?.experience)
    }, []);

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    const addExperience = () => {
        setExperienceList([...experienceList, { ...formField }]);
    }

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
        console.log('Updated experienceList:', newEntries);
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experienceList?.map(({ id, ...rest }) => rest)
            }
        }
        console.log('Payload to Strapi:', data);
        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast('Details updated !');
        }, (_error) => {
            setLoading(false);
        });
    }

    useEffect(() => {
        
        //console.log("Updating resumeInfo with experienceList:", experienceList);

        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        });
    }, [experienceList]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>

            <div>
                {experienceList.map((item, index) => (
                    <div key={index} className='border p-3 my-5 rounded-lg'>
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <label className='text-xs'>Position Title</label>
                                <Input
                                    name="title"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.title}

                                />
                            </div>
                            <div>
                                <label className='text-xs'>Company Name</label>
                                <Input
                                    name="companyName"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.companyName}

                                />
                            </div>
                            <div>
                                <label className='text-xs'>City</label>
                                <Input
                                    name="city"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.city}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>State</label>
                                <Input
                                    name="state"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.state}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.startDate}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.endDate}
                                />
                            </div>
                        </div>
                        {/* Work Summary */}
                        <div className='cols-span-2'>
                            <label className='text-xs'>Work Summary</label>
                            <RichTextEditor
                                index={index}
                                defaultValue={item?.workSummery}
                                onRichTextEditorChange={(event) => handleRichTextEditor(event,'workSummery' ,index)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between mt-4'>
                <div className='flex gap-2'>
                    <Button variant="outline" className="text-primary" onClick={addExperience}>
                        + Add More Experience</Button>
                    <Button variant="outline" className="text-primary" onClick={RemoveExperience}> - Remove</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Experience;