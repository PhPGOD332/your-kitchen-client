import React, {FC} from 'react';
import styles from './MeasurementVideo.module.scss';
import Image from "next/image";
import img from "@/data/images/photo-block.webp";

const VideoSection: FC = () => {
  return (
    <section className={`${styles.videoSection} section`}>
      <div className={`${styles.videoCard} gridBlock`}>
        <div className={styles.videoText}>
          <h2 className={`${styles.videoTitle} titleNotoFont`}>
            Качественный замер помещений – залог идеальной кухни.
          </h2>
          <div className={styles.videoDescription}>
            <p>Смотрите наше видео, где мы подробно рассказываем о тонкостях  проведения замера.</p>
            <p>Рассказываем о критичных нюансах и особенностях различных планировок,
              нестандартных размерах изделий, использования подоконного пространства при
              проектировании кухни и другой корпусной мебели.</p>
          </div>

        </div>
        <div className={styles.videoBlock}>
          <Image
            src={img.src}
            alt="Фото"
            width={512}
            height={356}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;