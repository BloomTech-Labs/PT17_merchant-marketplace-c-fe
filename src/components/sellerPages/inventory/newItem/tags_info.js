import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import '../inventoryStyles.css';
import FormButton from '../../../common/FormButton/FormButton';
import { Form, Input, Button, Select, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { addTag, fetchTags } from '../../../../state/actions';

function MoreInfo({ setData, setProgress, slider }) {
  const { Option } = Select;
  const tags = useSelector(state => state.tags.tags);
  const tagState = useSelector(state => state.addTag.newTag);
  const [selectedTag, setSelectedTag] = useState([]);
  const [newTag, setNewTag] = useState('');
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Enter tag name:');
  const formRef = React.createRef();

  const onFinish = values => {
    setData(values);
  };
  function onChange(value) {
    let selTag = tags.filter(el => value === el.id);
    let hasBeenChoosen = selectedTag.filter(el => el.id === selTag[0].id);
    if (hasBeenChoosen.length > 0) {
      warning(newTag, 'tag has been choosen, please select another one');
    } else {
      setSelectedTag([...selectedTag, selTag[0]]);
    }
  }
  const deleteItem = tagName => {
    let selTag = selectedTag.filter(tag => tag.tag_name !== tagName);
    setSelectedTag(selTag);
  };

  const createNewTagChange = e => {
    setNewTag(e.target.value);
  };

  function warning(name, warningString) {
    Modal.warning({
      title: 'Create a new tag ',
      content: `${name} ${warningString}`,
    });
  }
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    formRef.current.resetFields();
    setModalText('Create a new Tag');
    let selTag = tags.filter(
      el => newTag.toLowerCase() === el.tag_name.toLowerCase()
    );
    if (newTag === '') {
      warning(newTag, ' please enter tag name or cancel');
    } else if (selTag.length > 0) {
      warning(
        selTag[0].tag_name,
        'tag exists, please enter another tag name or cancel'
      );
    } else {
      dispatch(addTag(newTag, authState));
      e.preventDefault();
      setNewTag('');
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    dispatch(fetchTags(authState));
    console.log('Redux tag fetchTags state: ', tags);
  }, [tagState]);

  const handleCancel = () => {
    setVisible(false);
    formRef.current.resetFields();
    setNewTag('');
  };

  return (
    <div className="contents">
      <h1>Tags</h1>
      <p>
        Please, choose product tags. If a desired tag does not exist, create the
        new one and select created tag.
      </p>
      <Form
        className="dynamic_form_nest_item"
        onFinish={() => onFinish(selectedTag)}
      >
        <section className="spec-inputs">
          {/**--------------Select Tag---------------------- */}

          {/**---------------Choosen Tags------------------- */}
          <h3>Choosen Tags:</h3>
          {selectedTag.length === 0 && (
            <p className="category-warning">
              Please, select tag or create the new one.
            </p>
          )}
          {selectedTag &&
            selectedTag.map((tag, index) => (
              <div className="choosen-categories" key={index}>
                <div>{tag.tag_name}</div>
                <div
                  className="delete"
                  onClick={() => deleteItem(tag.tag_name)}
                >
                  <DeleteOutlined style={{ color: 'red' }} />
                </div>
              </div>
            ))}
          {/**------------Add New Tag----------------- */}
          <div className="modal-button">
            <Button type="primary" onClick={showModal}>
              Create New Tag
            </Button>
          </div>

          <Modal
            title="New Tag"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
            <Form className="dynamic_form_nest_item" ref={formRef}>
              <Form.Item
                name="tag_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input tag name',
                  },
                ]}
              >
                <Input
                  placeholder="Name of Tag"
                  onChange={createNewTagChange}
                  initialValue={newTag}
                  allowClear={true}
                  resetFields={true}
                />
              </Form.Item>
            </Form>
          </Modal>
        </section>
        <FormButton
          setProgress={setProgress}
          slider={slider}
          progressPercent={60}
          text="Next"
        />
      </Form>
    </div>
  );
}

export default MoreInfo;
